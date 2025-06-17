import express from 'express';
import * as wasteController from '../controllers/wasteController.js';
import { protect } from '../middleware/auth.js'; // Changed from default to named import
// import uploadMiddleware from '../middleware/upload.js'; // If you have an image upload middleware

const router = express.Router();

// POST   /api/waste/add              # Add waste item
// Potentially add uploadMiddleware here if handling image uploads directly
router.post('/add', protect, wasteController.addWasteItem);

// GET    /api/waste/my-items         # Get user's waste items
router.get('/my-items', protect, wasteController.getMyWasteItems);

// PUT    /api/waste/:id              # Update waste item
router.put('/:id', protect, wasteController.updateWasteItem);

// DELETE /api/waste/:id              # Delete waste item
router.delete('/:id', protect, wasteController.deleteWasteItem);

// GET    /api/waste/recyclers        # Get nearby recyclers
router.get('/recyclers', protect, wasteController.getNearbyRecyclers);

// POST   /api/waste/sell             # Sell waste to recycler
router.post('/sell', protect, wasteController.sellWasteToRecycler);

// GET    /api/waste/transactions     # Get transactions
router.get('/transactions', protect, wasteController.getWasteTransactions);

export default router;
