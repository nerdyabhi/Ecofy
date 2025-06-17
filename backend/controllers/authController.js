import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
// import emailService from '../utils/emailService.js'; // Assuming you will create this
// import crypto from 'crypto'; // For generating reset tokens

// User registration
export const register = async (req, res) => {
  const { name, email, password, phone } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    user = new User({
      name,
      email,
      password,
      phone,
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    const payload = {
      userId: user.id,
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '5h' }, // Token expiration
      (err, token) => {
        if (err) throw err;
        res.status(201).json({ token, userId: user.id, name: user.name });
      }
    );
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};

// User login
export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const payload = {
      userId: user.id,
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '5h' },
      (err, token) => {
        if (err) throw err;
        res.json({ token, userId: user.id, name: user.name });
      }
    );
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};

// Get current user
export const getMe = async (req, res) => {
  try {
    // req.user is set by the auth middleware
    const user = await User.findById(req.user.userId).select('-password');
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};

// Forgot password
export const forgotPassword = async (req, res) => {
  // Placeholder: Implement password reset token generation and email sending
  // 1. Find user by email
  // 2. Generate a reset token (e.g., using crypto module)
  // 3. Save token and expiry to user model (you might need to add fields to User model)
  // 4. Send email with reset link (using emailService.js)
  res.status(501).json({ message: 'Forgot password not implemented yet' });
};

// Reset password
export const resetPassword = async (req, res) => {
  // Placeholder: Implement password reset logic
  // 1. Get token from req.params or req.body
  // 2. Find user by reset token and check expiry
  // 3. Hash new password
  // 4. Update user's password and remove/invalidate reset token
  res.status(501).json({ message: 'Reset password not implemented yet' });
};
