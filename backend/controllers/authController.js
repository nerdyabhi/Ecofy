import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import sendEmail from '../utils/emailService.js'; 
import crypto from 'crypto'; 

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
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if(!token){
         res.status(401).json({ message: 'No token, authorization denied' });
         return;
    }

    const userId = jwt.verify(token, process.env.JWT_SECRET).userId;
    if (!userId) {
      return res.status(401).json({ message: 'Invalid token, authorization denied' });
    }

    const user = await User.findById(userId).select('-password');
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
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(20).toString('hex');
    user.passwordResetToken = crypto
      .createHash('sha256')
      .update(resetToken)
      .digest('hex');
    user.passwordResetExpires = Date.now() + 30 * 60 * 1000; // Token valid for 30 minutes

    await user.save({ validateBeforeSave: false });

    // Create reset URL
    // Adjust the URL to your frontend's reset password page
    const resetUrl = `${req.protocol}://${req.get(
      'host'
    )}/api/auth/resetpassword/${resetToken}`;

    const message = `You are receiving this email because you (or someone else) has requested the reset of a password. Please make a PUT request to: \n\n ${resetUrl} \n\nIf you did not request this, please ignore this email and your password will remain unchanged.`;

    try {
      await sendEmail({
        to: user.email,
        subject: 'Password Reset Token',
        text: message,
      });
      res.status(200).json({ success: true, data: 'Email sent' });
    } catch (err) {
      console.error('Email sending error:', err);
      user.passwordResetToken = undefined;
      user.passwordResetExpires = undefined;
      await user.save({ validateBeforeSave: false });
      return res.status(500).json({ message: 'Email could not be sent' });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};

// Reset password
export const resetPassword = async (req, res) => {
  try {
    // Get hashed token
    const passwordResetToken = crypto
      .createHash('sha256')
      .update(req.params.resettoken)
      .digest('hex');

    const user = await User.findOne({
      passwordResetToken,
      passwordResetExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired token' });
    }

    // Set new password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(req.body.password, salt);
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();

    // Send confirmation or login user directly
    res.status(200).json({ success: true, data: 'Password reset successful' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};
