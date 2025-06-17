import CommunityIssue from '../models/CommunityIssue.js';
import User from '../models/User.js'; // For user interactions like voting, commenting
import mongoose from 'mongoose'; // For ObjectId validation

// POST /api/community/report - Report new issue
export const reportIssue = async (req, res) => {
  const { title, description, category, priority, images, location, address } = req.body;
  try {
    const newIssue = new CommunityIssue({
      userId: req.user.id,
      title,
      description,
      category,
      priority,
      images, // Assuming images is an array of URLs
      location: {
        type: 'Point',
        coordinates: location.coordinates, // Expecting [longitude, latitude]
        address: address
      },
      status: 'open',
    });

    const issue = await newIssue.save();
    res.status(201).json(issue);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};

// GET /api/community/issues - Get all issues (can be filtered, paginated in future)
export const getAllIssues = async (req, res) => {
  try {
    // Basic find, can be extended with filters (e.g., by status, category, location)
    const issues = await CommunityIssue.find().populate('userId', 'name profileImage').sort({ createdAt: -1 });
    res.json(issues);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};

// GET /api/community/issues/:id - Get specific issue
export const getIssueById = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ message: 'Invalid issue ID format' });
    }
    const issue = await CommunityIssue.findById(req.params.id)
                                      .populate('userId', 'name profileImage')
                                      .populate('comments.userId', 'name profileImage');
    if (!issue) {
      return res.status(404).json({ message: 'Issue not found' });
    }
    res.json(issue);
  } catch (error) {
    console.error(error.message);
    if (error.kind === 'ObjectId') {
        return res.status(404).json({ message: 'Issue not found' });
    }
    res.status(500).send('Server error');
  }
};

// PUT /api/community/issues/:id - Update issue (e.g., status, priority by reporter or admin)
export const updateIssue = async (req, res) => {
  const { title, description, category, priority, status, images, location, address, authorityResponse } = req.body;
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ message: 'Invalid issue ID format' });
    }
    let issue = await CommunityIssue.findById(req.params.id);

    if (!issue) {
      return res.status(404).json({ message: 'Issue not found' });
    }

    // Basic authorization: only reporter or an admin (not implemented) can update fully
    // For now, let's assume only the reporter can update their own issue details
    if (issue.userId.toString() !== req.user.id) {
      // Allow status updates by others if needed (e.g. admin, assigned authority)
      // For now, restricting general updates to the reporter.
      // A more granular permission system would be needed for other roles.
      if(status && (req.user.role === 'admin' || req.user.role === 'authority')) { // Hypothetical roles
         issue.status = status;
         if(authorityResponse) issue.authorityResponse = authorityResponse;
      } else {
        return res.status(401).json({ message: 'User not authorized to update all fields of this issue' });
      }
    } else {
        // Reporter can update these fields
        if (title) issue.title = title;
        if (description) issue.description = description;
        if (category) issue.category = category;
        if (priority) issue.priority = priority;
        if (status) issue.status = status; // Reporter can also change status
        if (images) issue.images = images;
        if (location && location.coordinates) issue.location.coordinates = location.coordinates;
        if (address) issue.location.address = address;
    }

    issue = await issue.save();
    res.json(issue);
  } catch (error) {
    console.error(error.message);
    if (error.kind === 'ObjectId') {
        return res.status(404).json({ message: 'Issue not found' });
    }
    res.status(500).send('Server error');
  }
};

// DELETE /api/community/issues/:id - Delete issue (by reporter or admin)
export const deleteIssue = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ message: 'Invalid issue ID format' });
    }
    const issue = await CommunityIssue.findById(req.params.id);

    if (!issue) {
      return res.status(404).json({ message: 'Issue not found' });
    }

    // Authorization: only reporter or admin (not implemented) can delete
    if (issue.userId.toString() !== req.user.id /* && req.user.role !== 'admin' */) {
      return res.status(401).json({ message: 'User not authorized' });
    }

    await issue.deleteOne();
    res.json({ message: 'Community issue removed' });
  } catch (error) {
    console.error(error.message);
    if (error.kind === 'ObjectId') {
        return res.status(404).json({ message: 'Issue not found' });
    }
    res.status(500).send('Server error');
  }
};

// POST /api/community/vote/:id - Vote on an issue
export const voteIssue = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ message: 'Invalid issue ID format' });
    }
    const issue = await CommunityIssue.findById(req.params.id);
    if (!issue) {
      return res.status(404).json({ message: 'Issue not found' });
    }

    // Check if user has already voted
    if (issue.votedBy.some(userId => userId.equals(req.user.id))) {
      // Option to unvote: remove user from votedBy and decrement votes
      issue.votedBy = issue.votedBy.filter(userId => !userId.equals(req.user.id));
      issue.votes = issue.votedBy.length; // Recalculate votes
      await issue.save();
      return res.json({ message: 'Vote removed', votes: issue.votes, issue });
    } else {
      issue.votedBy.push(req.user.id);
      issue.votes = issue.votedBy.length; // Recalculate votes
      await issue.save();
      return res.json({ message: 'Voted successfully', votes: issue.votes, issue });
    }

  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};

// POST /api/community/comment/:id - Comment on an issue
export const commentIssue = async (req, res) => {
  const { text } = req.body;
  if (!text) {
    return res.status(400).json({ message: 'Comment text is required' });
  }
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ message: 'Invalid issue ID format' });
    }
    const issue = await CommunityIssue.findById(req.params.id);
    if (!issue) {
      return res.status(404).json({ message: 'Issue not found' });
    }

    const newComment = {
      userId: req.user.id,
      text,
      createdAt: new Date(),
    };

    issue.comments.push(newComment);
    await issue.save();
    
    // Populate user info for the new comment before sending back
    const populatedIssue = await CommunityIssue.findById(issue._id).populate('comments.userId', 'name profileImage');
    res.status(201).json(populatedIssue.comments[populatedIssue.comments.length -1]); // Return the new comment

  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};

// GET /api/community/nearby - Get nearby issues (Placeholder)
export const getNearbyIssues = async (req, res) => {
  const { longitude, latitude, distance = 10000 } = req.query; // distance in meters (default 10km)
  if (!longitude || !latitude) {
    return res.status(400).json({ message: 'Longitude and latitude are required query parameters.' });
  }
  try {
    // Requires a 2dsphere index on the location.coordinates field in CommunityIssue model
    // Ensure you have run: issueSchema.index({ "location.coordinates": '2dsphere' }); in your model definition
    const issues = await CommunityIssue.find({
      location: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [parseFloat(longitude), parseFloat(latitude)],
          },
          $maxDistance: parseInt(distance),
        },
      },
    }).populate('userId', 'name profileImage').sort({ createdAt: -1 });

    res.json(issues);
  } catch (error) {
    console.error('Error fetching nearby issues:', error.message);
    res.status(500).send('Server error');
  }
};
