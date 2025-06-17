import User from '../models/User.js';
import WasteItem from '../models/WasteItem.js';
import CarbonActivity from '../models/CarbonActivity.js';
import CommunityIssue from '../models/CommunityIssue.js';
import SharedItem from '../models/SharedItem.js';
import Transaction from '../models/Transaction.js';

// @desc    Get overall platform statistics
// @route   GET /api/analytics/stats
// @access  Public (or Admin)
export const getPlatformStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalWasteItems = await WasteItem.countDocuments();
    const totalCarbonActivities = await CarbonActivity.countDocuments();
    const totalCommunityIssues = await CommunityIssue.countDocuments();
    const totalSharedItems = await SharedItem.countDocuments();
    const totalTransactions = await Transaction.countDocuments();

    // More detailed stats
    const wasteCollected = await WasteItem.aggregate([
      { $match: { status: { $in: ['sold', 'collected'] } } },
      { $group: { _id: null, totalQuantity: { $sum: '$quantity' }, totalValue: { $sum: '$actualValue' } } }
    ]);

    const carbonEmissionsReduced = await CarbonActivity.aggregate([
        // This is a placeholder. Actual calculation depends on how reduction is defined.
        // For example, if certain activities are considered "reducing" activities.
        // Or, if we compare against a baseline.
        // For now, let's sum all recorded emissions as a proxy for engagement.
        { $group: { _id: null, totalEmissions: { $sum: '$carbonEmission' } } }
    ]);

    const issuesResolved = await CommunityIssue.countDocuments({ status: 'resolved' });
    const itemsShared = await SharedItem.aggregate([
        { $group: { _id: null, totalBorrows: { $sum: { $size: '$borrowHistory' } } } }
    ]);

    res.json({
      totalUsers,
      totalWasteItems,
      totalCarbonActivities,
      totalCommunityIssues,
      totalSharedItems,
      totalTransactions,
      wasteCollected: wasteCollected[0] || { totalQuantity: 0, totalValue: 0 },
      carbonEmissionsTracked: carbonEmissionsReduced[0]?.totalEmissions || 0, // Renamed for clarity
      communityIssuesResolved: issuesResolved,
      sharedItemsBorrowedCount: itemsShared[0]?.totalBorrows || 0,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get user-specific analytics (contribution summary)
// @route   GET /api/analytics/user/:userId
// @access  Private (Admin or specific user)
export const getUserAnalytics = async (req, res) => {
  try {
    const userId = req.params.userId;

    // Basic check if the requesting user is the one whose analytics are being fetched or an admin
    // More robust role-based access control would be needed for production
    if (req.user.id !== userId && !req.user.isAdmin) { // Assuming isAdmin field on user model
        return res.status(403).json({ message: 'User not authorized' });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const wasteItems = await WasteItem.find({ userId });
    const carbonActivities = await CarbonActivity.find({ userId });
    const communityIssuesReported = await CommunityIssue.find({ userId });
    const sharedItemsOwned = await SharedItem.find({ ownerId: userId });
    const itemsBorrowed = await SharedItem.countDocuments({ 'borrowHistory.userId': userId });
    const ecoPointsEarned = user.ecoPoints;

    const totalWasteSold = wasteItems
      .filter(item => item.status === 'sold' && item.actualValue)
      .reduce((sum, item) => sum + item.actualValue, 0);

    const totalCarbonFootprint = carbonActivities.reduce((sum, activity) => sum + activity.carbonEmission, 0);

    res.json({
      user: { name: user.name, email: user.email, joinDate: user.createdAt },
      wasteManagement: {
        itemsListed: wasteItems.length,
        itemsSoldOrCollected: wasteItems.filter(item => ['sold', 'collected'].includes(item.status)).length,
        totalWasteSoldValue: totalWasteSold,
        categories: wasteItems.reduce((acc, item) => {
            acc[item.category] = (acc[item.category] || 0) + item.quantity;
            return acc;
        }, {}),
      },
      carbonTracking: {
        activitiesLogged: carbonActivities.length,
        totalCarbonFootprint,
        averageDailyFootprint: carbonActivities.length > 0 ? totalCarbonFootprint / ( (new Date() - new Date(user.createdAt))/(1000*60*60*24) ) : 0, // crude daily avg
        categories: carbonActivities.reduce((acc, activity) => {
            acc[activity.category] = (acc[activity.category] || 0) + activity.carbonEmission;
            return acc;
        }, {}),
      },
      communityEngagement: {
        issuesReported: communityIssuesReported.length,
        issuesResolved: communityIssuesReported.filter(issue => issue.status === 'resolved').length,
      },
      sharingEconomy: {
        itemsShared: sharedItemsOwned.length,
        itemsBorrowed,
        totalTimesOwnItemsBorrowed: sharedItemsOwned.reduce((sum, item) => sum + item.borrowHistory.length, 0),
      },
      ecoPoints: ecoPointsEarned,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get leaderboards (e.g., top eco-point earners, top recyclers)
// @route   GET /api/analytics/leaderboard
// @access  Public
export const getLeaderboard = async (req, res) => {
  try {
    const { type = 'ecoPoints', limit = 10 } = req.query;
    let leaderboard;

    switch (type) {
      case 'ecoPoints':
        leaderboard = await User.find({}, 'name ecoPoints profileImage')
          .sort({ ecoPoints: -1 })
          .limit(parseInt(limit));
        break;
      case 'recyclers': // Users who sold most waste value or quantity
        leaderboard = await WasteItem.aggregate([
          { $match: { status: 'sold', actualValue: { $gt: 0 } } },
          { $group: { _id: '$userId', totalValueSold: { $sum: '$actualValue' }, totalItemsSold: { $sum: 1 } } },
          { $sort: { totalValueSold: -1 } },
          { $limit: parseInt(limit) },
          { $lookup: { from: 'users', localField: '_id', foreignField: '_id', as: 'user' } },
          { $unwind: '$user' },
          { $project: { name: '$user.name', profileImage: '$user.profileImage', totalValueSold: 1, totalItemsSold: 1, _id: 0, userId: '$_id' } }
        ]);
        break;
      case 'sharers': // Users whose items were borrowed most
        leaderboard = await SharedItem.aggregate([
            { $unwind: '$borrowHistory' },
            { $group: { _id: '$ownerId', totalBorrows: { $sum: 1 } } },
            { $sort: { totalBorrows: -1 } },
            { $limit: parseInt(limit) },
            { $lookup: { from: 'users', localField: '_id', foreignField: '_id', as: 'user' } },
            { $unwind: '$user' },
            { $project: { name: '$user.name', profileImage: '$user.profileImage', totalBorrows: 1, _id: 0, userId: '$_id' } }
        ]);
        break;
      case 'communityContributors': // Users who reported most issues or got most votes
        leaderboard = await CommunityIssue.aggregate([
            { $group: { _id: '$userId', totalIssuesReported: { $sum: 1 }, totalVotesReceived: { $sum: '$votes' } } },
            { $sort: { totalIssuesReported: -1, totalVotesReceived: -1 } }, // Prioritize by issues, then votes
            { $limit: parseInt(limit) },
            { $lookup: { from: 'users', localField: '_id', foreignField: '_id', as: 'user' } },
            { $unwind: '$user' },
            { $project: { name: '$user.name', profileImage: '$user.profileImage', totalIssuesReported: 1, totalVotesReceived: 1, _id: 0, userId: '$_id' } }
        ]);
        break;
      default:
        return res.status(400).json({ message: 'Invalid leaderboard type' });
    }

    res.json(leaderboard);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get trends over time (e.g., waste recycling, carbon emissions)
// @route   GET /api/analytics/trends
// @access  Public (or Admin)
export const getTrends = async (req, res) => {
  try {
    const { type = 'waste', period = 'monthly' } = req.query; // period: daily, weekly, monthly
    let trendData;

    let groupByFormat;
    switch (period) {
        case 'daily': groupByFormat = '%Y-%m-%d'; break;
        case 'weekly': groupByFormat = '%Y-%U'; break; // Week of year
        case 'monthly':
        default: groupByFormat = '%Y-%m'; break;
    }

    switch (type) {
      case 'waste':
        trendData = await WasteItem.aggregate([
          { $match: { status: { $in: ['sold', 'collected'] } } },
          {
            $group: {
              _id: { $dateToString: { format: groupByFormat, date: '$updatedAt' } }, // Use updatedAt as it reflects when status changed to sold/collected
              totalQuantity: { $sum: '$quantity' },
              totalValue: { $sum: '$actualValue' },
              count: { $sum: 1 }
            }
          },
          { $sort: { '_id': 1 } },
          { $project: { date: '$_id', totalQuantity: 1, totalValue: 1, count: 1, _id: 0 } }
        ]);
        break;
      case 'carbon':
        trendData = await CarbonActivity.aggregate([
          {
            $group: {
              _id: { $dateToString: { format: groupByFormat, date: '$date' } },
              totalEmissions: { $sum: '$carbonEmission' },
              activityCount: { $sum: 1 }
            }
          },
          { $sort: { '_id': 1 } },
          { $project: { date: '$_id', totalEmissions: 1, activityCount: 1, _id: 0 } }
        ]);
        break;
      case 'issues': // Community issues reported over time
        trendData = await CommunityIssue.aggregate([
            {
                $group: {
                    _id: { $dateToString: { format: groupByFormat, date: '$createdAt' } },
                    count: { $sum: 1 }
                }
            },
            { $sort: { '_id': 1 } },
            { $project: { date: '$_id', count: 1, _id: 0 } }
        ]);
        break;
       case 'sharing': // Items borrowed over time
        trendData = await SharedItem.aggregate([
            { $unwind: '$borrowHistory' },
            {
                $group: {
                    _id: { $dateToString: { format: groupByFormat, date: '$borrowHistory.borrowDate' } },
                    borrowCount: { $sum: 1 }
                }
            },
            { $sort: { '_id': 1 } },
            { $project: { date: '$_id', borrowCount: 1, _id: 0 } }
        ]);
        break;
      default:
        return res.status(400).json({ message: 'Invalid trend type' });
    }

    res.json(trendData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
