import SharedItem from '../models/SharedItem.js';
import User from '../models/User.js';
import Transaction from '../models/Transaction.js';

// @desc    Add a new item for sharing
// @route   POST /api/sharing
// @access  Private
export const addItem = async (req, res) => {
  try {
    const { title, description, category, images, location, condition } = req.body;
    const newItem = new SharedItem({
      ownerId: req.user.id,
      title,
      description,
      category,
      images,
      location,
      condition,
    });
    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get all shared items (can be filtered by category, location)
// @route   GET /api/sharing
// @access  Public
export const getAllSharedItems = async (req, res) => {
  try {
    const { category, lat, lng, radius = 10 } = req.query; // radius in km
    const query = { availability: true };

    if (category) {
      query.category = category;
    }

    if (lat && lng) {
      query.location = {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [parseFloat(lng), parseFloat(lat)],
          },
          $maxDistance: radius * 1000, // convert km to meters
        },
      };
    }

    const items = await SharedItem.find(query).populate('ownerId', 'name avatar');
    res.json(items);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get a specific shared item by ID
// @route   GET /api/sharing/:id
// @access  Public
export const getSharedItemById = async (req, res) => {
  try {
    const item = await SharedItem.findById(req.params.id)
      .populate('ownerId', 'name avatar email')
      .populate('borrowRequests.userId', 'name avatar')
      .populate('currentBorrower', 'name avatar')
      .populate('borrowHistory.userId', 'name avatar');

    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }
    res.json(item);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Update a shared item
// @route   PUT /api/sharing/:id
// @access  Private (Owner only)
export const updateSharedItem = async (req, res) => {
  try {
    const item = await SharedItem.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }
    if (item.ownerId.toString() !== req.user.id) {
      return res.status(401).json({ message: 'User not authorized' });
    }

    const { title, description, category, images, location, availability, condition } = req.body;
    if (title) item.title = title;
    if (description) item.description = description;
    if (category) item.category = category;
    if (images) item.images = images;
    if (location) item.location = location;
    if (availability !== undefined) item.availability = availability;
    if (condition) item.condition = condition;

    const updatedItem = await item.save();
    res.json(updatedItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Delete a shared item
// @route   DELETE /api/sharing/:id
// @access  Private (Owner only)
export const deleteSharedItem = async (req, res) => {
  try {
    const item = await SharedItem.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }
    if (item.ownerId.toString() !== req.user.id) {
      return res.status(401).json({ message: 'User not authorized' });
    }
    // Add check: cannot delete if currently borrowed or has pending requests?
    if (item.currentBorrower || item.borrowRequests.some(r => r.status === 'pending' || r.status === 'approved')) {
        return res.status(400).json({ message: 'Cannot delete item with active borrows or requests.' });
    }

    await item.deleteOne(); // Changed from .remove() which is deprecated
    res.json({ message: 'Shared item removed' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Request to borrow an item
// @route   POST /api/sharing/:id/request
// @access  Private
export const requestBorrowItem = async (req, res) => {
  try {
    const item = await SharedItem.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }
    if (!item.availability) {
      return res.status(400).json({ message: 'Item not available for borrowing' });
    }
    if (item.ownerId.toString() === req.user.id) {
      return res.status(400).json({ message: 'Cannot borrow your own item' });
    }
     // Check if user already has a pending or approved request for this item
    const existingRequest = item.borrowRequests.find(
        (request) => request.userId.toString() === req.user.id && (request.status === 'pending' || request.status === 'approved')
    );
    if (existingRequest) {
        return res.status(400).json({ message: 'You already have an active request for this item.' });
    }


    const { message } = req.body;
    item.borrowRequests.push({ userId: req.user.id, message });
    await item.save();
    res.status(201).json({ message: 'Borrow request submitted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Respond to a borrow request (approve/reject)
// @route   PUT /api/sharing/:itemId/request/:requestId
// @access  Private (Owner only)
export const respondToBorrowRequest = async (req, res) => {
  try {
    const { status } = req.body; // 'approved' or 'rejected'
    const item = await SharedItem.findById(req.params.itemId);

    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }
    if (item.ownerId.toString() !== req.user.id) {
      return res.status(401).json({ message: 'User not authorized' });
    }

    const request = item.borrowRequests.id(req.params.requestId);
    if (!request) {
      return res.status(404).json({ message: 'Request not found' });
    }
    if (request.status !== 'pending') {
      return res.status(400).json({ message: `Request already ${request.status}` });
    }

    if (status === 'approved') {
      if (!item.availability || item.currentBorrower) {
        return res.status(400).json({ message: 'Item is no longer available or already borrowed' });
      }
      // Reject other pending requests for this item
      item.borrowRequests.forEach(req => {
        if (req.status === 'pending' && req.id !== req.params.requestId) {
          req.status = 'rejected';
        }
      });
      request.status = 'approved';
      item.currentBorrower = request.userId;
      item.availability = false; // Mark as unavailable once approved for borrowing
    } else if (status === 'rejected') {
      request.status = 'rejected';
    } else {
      return res.status(400).json({ message: 'Invalid status' });
    }

    await item.save();
    res.json({ message: `Request ${status}` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Mark an item as returned
// @route   PUT /api/sharing/:id/return
// @access  Private (Borrower or Owner)
export const returnItem = async (req, res) => {
  try {
    const item = await SharedItem.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }
    if (!item.currentBorrower) {
      return res.status(400).json({ message: 'Item not currently borrowed' });
    }
    // Allow either borrower or owner to mark as returned
    if (item.currentBorrower.toString() !== req.user.id && item.ownerId.toString() !== req.user.id) {
      return res.status(401).json({ message: 'User not authorized to mark this item as returned' });
    }

    const { rating, review } = req.body; // Optional rating/review from borrower

    // Add to borrow history
    item.borrowHistory.push({
      userId: item.currentBorrower,
      borrowDate: item.borrowRequests.find(r => r.userId.equals(item.currentBorrower) && r.status === 'approved')?.requestDate || new Date(), // Fallback, ideally find the approval date
      returnDate: new Date(),
      rating,
      review,
    });

    // Update eco-points for owner and borrower (example: 10 points for sharing, 5 for borrowing)
    const owner = await User.findById(item.ownerId);
    const borrower = await User.findById(item.currentBorrower);

    if (owner) {
        owner.ecoPoints = (owner.ecoPoints || 0) + 10; // Award points for sharing
        await owner.save();
        // Create transaction for owner
        await Transaction.create({
            userId: owner._id,
            type: 'sharing_reward',
            amount: 10,
            description: `Reward for sharing item: ${item.title}`,
            relatedId: item._id,
            status: 'completed'
        });
    }
    if (borrower) {
        borrower.ecoPoints = (borrower.ecoPoints || 0) + 5; // Award points for borrowing
        await borrower.save();
         // Create transaction for borrower
        await Transaction.create({
            userId: borrower._id,
            type: 'sharing_reward',
            amount: 5,
            description: `Reward for borrowing item: ${item.title}`,
            relatedId: item._id,
            status: 'completed'
        });
    }
    
    // Clear current borrower and mark as available
    item.currentBorrower = null;
    item.availability = true;
    // Clear approved request from borrowRequests
     const approvedRequestIndex = item.borrowRequests.findIndex(r => r.status === 'approved');
     if (approvedRequestIndex > -1) {
         item.borrowRequests.splice(approvedRequestIndex, 1);
     }


    await item.save();
    res.json({ message: 'Item marked as returned' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get items borrowed by the current user
// @route   GET /api/sharing/myborrowed
// @access  Private
export const getMyBorrowedItems = async (req, res) => {
  try {
    const items = await SharedItem.find({ currentBorrower: req.user.id })
      .populate('ownerId', 'name avatar email')
      .sort({ createdAt: -1 });
    res.json(items);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get items shared by the current user
// @route   GET /api/sharing/myshared
// @access  Private
export const getMySharedItems = async (req, res) => {
  try {
    const items = await SharedItem.find({ ownerId: req.user.id })
      .populate('currentBorrower', 'name avatar')
      .populate('borrowRequests.userId', 'name avatar')
      .sort({ createdAt: -1 });
    res.json(items);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get borrow requests for items owned by the current user
// @route   GET /api/sharing/myrequests
// @access  Private
export const getMyItemRequests = async (req, res) => {
  try {
    // Find items owned by the user that have pending borrow requests
    const itemsWithPendingRequests = await SharedItem.find({
      ownerId: req.user.id,
      'borrowRequests.status': 'pending',
    }).populate('borrowRequests.userId', 'name avatar email');

    // Extract and flatten the requests
    const pendingRequests = itemsWithPendingRequests.reduce((acc, item) => {
      const itemRequests = item.borrowRequests
        .filter(request => request.status === 'pending')
        .map(request => ({
          itemId: item._id,
          itemTitle: item.title,
          requestUser: request.userId,
          message: request.message,
          requestDate: request.requestDate,
          requestId: request._id,
        }));
      return acc.concat(itemRequests);
    }, []);

    res.json(pendingRequests);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
