import express from 'express';
import * as carbonController from '../controllers/carbonController.js';
import { protect } from '../middleware/auth.js'; // Changed from default to named import

const router = express.Router();

// POST   /api/carbon/add-activity    # Log carbon activity
router.post('/add-activity', protect, carbonController.addCarbonActivity);

// GET    /api/carbon/activities      # Get activities
router.get('/activities', protect, carbonController.getCarbonActivities);

// PUT    /api/carbon/:id             # Update activity
router.put('/:id', protect, carbonController.updateCarbonActivity);

// DELETE /api/carbon/:id             # Delete activity
router.delete('/:id', protect, carbonController.deleteCarbonActivity);

// GET    /api/carbon/summary         # Get carbon summary
router.get('/summary', protect, carbonController.getCarbonSummary);

// GET    /api/carbon/trends          # Get monthly trends
router.get('/trends', protect, carbonController.getCarbonTrends);

export default router;

