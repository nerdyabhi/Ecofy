import express from 'express';
import * as userController from '../controllers/userController.js';
import { protect } from '../middleware/auth.js'; // Corrected import

const router = express.Router();

// GET    /api/users/profile          # Get user profile
router.get('/profile', protect, userController.getProfile);

// PUT    /api/users/profile          # Update profile
router.put('/profile', protect, userController.updateProfile);

// GET    /api/users/dashboard        # Dashboard data
router.get('/dashboard', protect, userController.getDashboardData);

// PUT    /api/users/location         # Update location
router.put('/location', protect, userController.updateLocation);

export default router;
