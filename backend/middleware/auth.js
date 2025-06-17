import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const protect = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ message: 'No token, authorization denied' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Select a subset of user fields, excluding password
    const user = await User.findById(decoded.userId).select('-password'); 
    if (!user) {
      return res.status(401).json({ message: 'User not found, token invalid' });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error('Token verification error:', error.message);
    res.status(401).json({ message: 'Token is not valid' });
  }
};

export const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) { // Assuming you add an 'isAdmin' field to your User model
    next();
  } else {
    res.status(403).json({ message: 'Not authorized as an admin' });
  }
};
