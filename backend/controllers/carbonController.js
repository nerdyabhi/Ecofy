import CarbonActivity from '../models/CarbonActivity.js';
import User from '../models/User.js'; // For updating user's carbonScore if needed
import mongoose from 'mongoose'; // Added for ObjectId casting

// POST /api/carbon/add-activity - Log carbon activity
export const addCarbonActivity = async (req, res) => {
  const { category, activityType, quantity, unit, carbonEmission, date, notes } = req.body;
  try {
    const newActivity = new CarbonActivity({
      userId: req.user.id,
      category,
      activityType,
      quantity,
      unit,
      carbonEmission, // This could be calculated on the frontend or backend based on type/quantity
      date,
      notes,
    });

    const activity = await newActivity.save();

    // Optionally, update the user's total carbonScore here
    // const user = await User.findById(req.user.id);
    // user.carbonScore += carbonEmission; // Or some other logic
    // await user.save();

    res.status(201).json(activity);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};

// GET /api/carbon/activities - Get user's carbon activities
export const getCarbonActivities = async (req, res) => {
  try {
    const activities = await CarbonActivity.find({ userId: req.user.id }).sort({ date: -1 });
    res.json(activities);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};

// PUT /api/carbon/:id - Update carbon activity
export const updateCarbonActivity = async (req, res) => {
  const { category, activityType, quantity, unit, carbonEmission, date, notes } = req.body;
  try {
    let activity = await CarbonActivity.findById(req.params.id);

    if (!activity) {
      return res.status(404).json({ message: 'Carbon activity not found' });
    }

    if (activity.userId.toString() !== req.user.id) {
      return res.status(401).json({ message: 'User not authorized' });
    }

    // Store old emission value if you need to adjust user's total carbonScore
    // const oldEmission = activity.carbonEmission;

    if (category) activity.category = category;
    if (activityType) activity.activityType = activityType;
    if (quantity) activity.quantity = quantity;
    if (unit) activity.unit = unit;
    if (carbonEmission) activity.carbonEmission = carbonEmission;
    if (date) activity.date = date;
    if (notes) activity.notes = notes;

    activity = await activity.save();

    // Optionally, update user's total carbonScore
    // if (carbonEmission && carbonEmission !== oldEmission) {
    //   const user = await User.findById(req.user.id);
    //   user.carbonScore = (user.carbonScore - oldEmission) + carbonEmission;
    //   await user.save();
    // }

    res.json(activity);
  } catch (error) {
    console.error(error.message);
    if (error.kind === 'ObjectId') {
        return res.status(404).json({ message: 'Carbon activity not found' });
    }
    res.status(500).send('Server error');
  }
};

// DELETE /api/carbon/:id - Delete carbon activity
export const deleteCarbonActivity = async (req, res) => {
  try {
    const activity = await CarbonActivity.findById(req.params.id);

    if (!activity) {
      return res.status(404).json({ message: 'Carbon activity not found' });
    }

    if (activity.userId.toString() !== req.user.id) {
      return res.status(401).json({ message: 'User not authorized' });
    }

    // const emissionToSubtract = activity.carbonEmission;
    await activity.deleteOne();

    // Optionally, update user's total carbonScore
    // const user = await User.findById(req.user.id);
    // user.carbonScore -= emissionToSubtract;
    // await user.save();

    res.json({ message: 'Carbon activity removed' });
  } catch (error) {
    console.error(error.message);
    if (error.kind === 'ObjectId') {
        return res.status(404).json({ message: 'Carbon activity not found' });
    }
    res.status(500).send('Server error');
  }
};

// GET /api/carbon/summary - Get carbon summary (Placeholder)
export const getCarbonSummary = async (req, res) => {
  try {
    // Placeholder: Calculate summary statistics for the user's carbon activities.
    // This could include total emissions, emissions by category, etc.
    const activities = await CarbonActivity.find({ userId: req.user.id });
    let totalEmission = 0;
    const summaryByCategory = {};

    activities.forEach(act => {
      totalEmission += act.carbonEmission;
      summaryByCategory[act.category] = (summaryByCategory[act.category] || 0) + act.carbonEmission;
    });
    
    // You might also want to fetch the user's overall carbonScore from the User model
    const user = await User.findById(req.user.id).select('carbonScore ecoPoints');

    res.json({
      totalEmission,
      summaryByCategory,
      userCarbonScore: user ? user.carbonScore : 0,
      // Add more summary data as needed
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};

// GET /api/carbon/trends - Get monthly trends (Placeholder)
export const getCarbonTrends = async (req, res) => {
  try {
    // Placeholder: Aggregate carbon activities by month to show trends.
    // This would typically involve using MongoDB aggregation framework.
    const trends = await CarbonActivity.aggregate([
      { $match: { userId: new mongoose.Types.ObjectId(req.user.id) } }, // Ensure correct ObjectId casting
      {
        $group: {
          _id: { year: { $year: "$date" }, month: { $month: "$date" } },
          totalEmission: { $sum: "$carbonEmission" },
          count: { $sum: 1 }
        }
      },
      { $sort: { "_id.year": 1, "_id.month": 1 } }
    ]);
    res.json(trends);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error - getCarbonTrends placeholder error');
  }
};
