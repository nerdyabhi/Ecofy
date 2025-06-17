import express from 'express';
import {
  addItem,
  getAllSharedItems,
  getSharedItemById,
  updateSharedItem,
  deleteSharedItem,
  requestBorrowItem,
  respondToBorrowRequest,
  returnItem,
  getMyBorrowedItems,
  getMySharedItems,
  getMyItemRequests
} from '../controllers/sharingController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.route('/')
  .post(protect, addItem)
  .get(getAllSharedItems);

router.route('/myborrowed').get(protect, getMyBorrowedItems);
router.route('/myshared').get(protect, getMySharedItems);
router.route('/myrequests').get(protect, getMyItemRequests);

router.route('/:id')
  .get(getSharedItemById)
  .put(protect, updateSharedItem)
  .delete(protect, deleteSharedItem);

router.route('/:id/request').post(protect, requestBorrowItem);
router.route('/:itemId/request/:requestId').put(protect, respondToBorrowRequest);
router.route('/:id/return').put(protect, returnItem);

export default router;
