import express from 'express';
import * as communityController from '../controllers/communityController.js';
import { protect } from '../middleware/auth.js'; // Changed from default to named import

const router = express.Router();

// POST   /api/community/report       # Report new issue
router.post('/report', protect, communityController.reportIssue);

// GET    /api/community/issues       # Get all issues
router.get('/issues', protect, communityController.getAllIssues);

// GET    /api/community/issues/:id   # Get specific issue
router.get('/issues/:id', protect, communityController.getIssueById);

// PUT    /api/community/issues/:id   # Update issue
router.put('/issues/:id', protect, communityController.updateIssue);

// DELETE /api/community/issues/:id   # Delete issue
router.delete('/issues/:id', protect, communityController.deleteIssue);

// POST   /api/community/vote/:id     # Vote on issue
router.post('/vote/:id', protect, communityController.voteIssue);

// POST   /api/community/comment/:id  # Comment on issue
router.post('/comment/:id', protect, communityController.commentIssue);

// GET    /api/community/nearby       # Get nearby issues
router.get('/nearby', protect, communityController.getNearbyIssues);

export default router;
