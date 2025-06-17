import express from 'express';
import {
  getPlatformStats,
  getUserAnalytics,
  getLeaderboard,
  getTrends
} from '../controllers/analyticsController.js';
import { protect, admin } from '../middleware/auth.js'; // Assuming you might add an admin middleware

const router = express.Router();

// Public or Admin access for general stats and leaderboards
router.get('/stats', getPlatformStats); // Could be admin protected: protect, admin, getPlatformStats
router.get('/leaderboard', getLeaderboard);
router.get('/trends', getTrends); // Could be admin protected: protect, admin, getTrends

// Protected route for user-specific analytics
// Note: The controller itself checks if the requesting user is the target user or an admin.
// For a stricter approach, you might have separate admin routes or more granular permissions.
router.get('/user/:userId', protect, getUserAnalytics);

export default router;
