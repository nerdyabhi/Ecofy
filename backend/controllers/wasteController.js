import WasteItem from '../models/WasteItem.js';
import User from '../models/User.js'; // Needed for recycler interactions or user-specific actions
import Transaction from '../models/Transaction.js'; // For sell/transaction logic

// POST /api/waste/add - Add waste item
export const addWasteItem = async (req, res) => {
  const { category, description, quantity, unit, images, location, estimatedValue } = req.body;
  try {
    const newWasteItem = new WasteItem({
      userId: req.user.id,
      category,
      description,
      quantity,
      unit,
      images, // Assuming images is an array of URLs or will be handled by upload middleware later
      location, // Assuming location is { type: 'Point', coordinates: [lng, lat], address: 'string' }
      estimatedValue,
      status: 'available',
    });

    const wasteItem = await newWasteItem.save();
    res.status(201).json(wasteItem);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};

// GET /api/waste/my-items - Get user's waste items
export const getMyWasteItems = async (req, res) => {
  try {
    const wasteItems = await WasteItem.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json(wasteItems);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};

// PUT /api/waste/:id - Update waste item
export const updateWasteItem = async (req, res) => {
  const { category, description, quantity, unit, images, location, status, estimatedValue, actualValue, recyclerId } = req.body;
  try {
    let wasteItem = await WasteItem.findById(req.params.id);

    if (!wasteItem) {
      return res.status(404).json({ message: 'Waste item not found' });
    }

    // Check if the user owns the waste item
    if (wasteItem.userId.toString() !== req.user.id) {
      return res.status(401).json({ message: 'User not authorized' });
    }

    // Update fields
    if (category) wasteItem.category = category;
    if (description) wasteItem.description = description;
    if (quantity) wasteItem.quantity = quantity;
    if (unit) wasteItem.unit = unit;
    if (images) wasteItem.images = images;
    if (location) wasteItem.location = location;
    if (status) wasteItem.status = status;
    if (estimatedValue) wasteItem.estimatedValue = estimatedValue;
    if (actualValue) wasteItem.actualValue = actualValue;
    if (recyclerId) wasteItem.recyclerId = recyclerId; // Potentially link to a User who is a recycler

    wasteItem = await wasteItem.save();
    res.json(wasteItem);
  } catch (error) {
    console.error(error.message);
    if (error.kind === 'ObjectId') {
        return res.status(404).json({ message: 'Waste item not found' });
    }
    res.status(500).send('Server error');
  }
};

// DELETE /api/waste/:id - Delete waste item
export const deleteWasteItem = async (req, res) => {
  try {
    const wasteItem = await WasteItem.findById(req.params.id);

    if (!wasteItem) {
      return res.status(404).json({ message: 'Waste item not found' });
    }

    if (wasteItem.userId.toString() !== req.user.id) {
      return res.status(401).json({ message: 'User not authorized' });
    }

    await wasteItem.deleteOne(); // Changed from .remove() which is deprecated

    res.json({ message: 'Waste item removed' });
  } catch (error) {
    console.error(error.message);
    if (error.kind === 'ObjectId') {
        return res.status(404).json({ message: 'Waste item not found' });
    }
    res.status(500).send('Server error');
  }
};

// GET /api/waste/recyclers - Get nearby recyclers (Placeholder)
export const getNearbyRecyclers = async (req, res) => {
  // Placeholder: Implement logic to find users/entities marked as recyclers,
  // potentially based on location proximity.
  // This might involve querying the User collection for users with a 'recycler' role/type
  // and using geospatial queries if locations are stored.
  res.status(501).json({ message: 'Get nearby recyclers not implemented yet' });
};

// POST /api/waste/sell - Sell waste to recycler (Placeholder)
export const sellWasteToRecycler = async (req, res) => {
  const { wasteItemId, recyclerId, agreedValue } = req.body;
  // Placeholder: 
  // 1. Validate wasteItem and recycler.
  // 2. Update WasteItem status to 'sold' or 'pending_collection'.
  // 3. Create a Transaction record.
  // 4. Potentially award ecoPoints to the user.
  // 5. Notify recycler (optional).
  res.status(501).json({ message: 'Sell waste to recycler not implemented yet' });
};

// GET /api/waste/transactions - Get transactions (Placeholder)
export const getWasteTransactions = async (req, res) => {
  try {
    // Placeholder: Fetch transactions related to the user's waste sales.
    // This would typically filter the Transaction collection by userId and type='waste_sale'.
    const transactions = await Transaction.find({ userId: req.user.id, type: 'waste_sale' }).sort({ createdAt: -1 });
    if (!transactions) {
        return res.json([]); // Return empty array if no transactions found
    }
    res.json(transactions);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error - getWasteTransactions placeholder error');
  }
};
