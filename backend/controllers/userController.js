import User from '../models/User.js';

// Get user profile
export const getProfile = async (req, res) => {
  try {
    // req.user is populated by the authMiddleware
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};

// Update user profile
export const updateProfile = async (req, res) => {
  const { name, phone, profileImage, preferences, address } = req.body;
  const { coordinates } = req.body.location || {}; // Assuming location might be nested

  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update fields if they are provided
    if (name) user.name = name;
    if (phone) user.phone = phone;
    if (profileImage) user.profileImage = profileImage;
    if (preferences) user.preferences = { ...user.preferences, ...preferences };
    
    if (address || coordinates) {
        user.location = user.location || { type: 'Point' };
        if(address) user.location.address = address;
        if(coordinates) user.location.coordinates = coordinates; // [longitude, latitude]
    }


    await user.save();
    res.json(await User.findById(req.user.id).select('-password')); // Return updated user, excluding password
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};

// Get user dashboard data (Placeholder)
export const getDashboardData = async (req, res) => {
  try {
    // This is a placeholder.
    // Actual implementation would fetch various data related to the user:
    // - Recent waste items
    // - Carbon footprint summary
    // - Community issues reported/voted on
    // - Shared items status
    // - Eco-points and achievements
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ 
      message: 'Dashboard data placeholder',
      ecoPoints: user.ecoPoints,
      carbonScore: user.carbonScore,
      // Add more data as needed
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};

// Update user location
export const updateLocation = async (req, res) => {
  const { coordinates, address } = req.body; // Expecting { "coordinates": [longitude, latitude], "address": "string" }

  if (!coordinates || !Array.isArray(coordinates) || coordinates.length !== 2 || !address) {
    return res.status(400).json({ message: 'Invalid location data. Provide coordinates [lng, lat] and address.' });
  }

  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.location = {
      type: 'Point',
      coordinates: coordinates, // [longitude, latitude]
      address: address,
    };

    await user.save();
    res.json({
        message: "Location updated successfully",
        location: user.location
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};
