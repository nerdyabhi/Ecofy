import express from 'express';
import * as authController from '../controllers/authController.js';
import { protect } from '../middleware/auth.js'; // Changed from default to named import

const router = express.Router();

// POST   /api/auth/register          # User registration
router.post('/register', authController.register);

// POST   /api/auth/login             # User login
router.post('/login', authController.login);

// GET    /api/auth/me                # Get current user
router.get('/me', protect, authController.getMe); // Used protect middleware

// POST   /api/auth/forgot-password   # Send reset email
router.post('/forgot-password', authController.forgotPassword);

// POST   /api/auth/reset-password    # Reset password
router.post('/reset-password', authController.resetPassword);

export default router;
