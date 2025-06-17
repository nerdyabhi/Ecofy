import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

import authRoutes from './routes/auth.js';
import userRoutes from './routes/users.js';
import wasteRoutes from './routes/waste.js';
import carbonRoutes from './routes/carbon.js';
import communityRoutes from './routes/community.js';
import sharingRoutes from './routes/sharing.js';
import analyticsRoutes from './routes/analytics.js';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// Database connection
mongoose.connect(process.env.MONGODB_URI, {
  // useNewUrlParser: true, // Deprecated options
  // useUnifiedTopology: true,
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/waste', wasteRoutes);
app.use('/api/carbon', carbonRoutes);
app.use('/api/community', communityRoutes);
app.use('/api/sharing', sharingRoutes);
app.use('/api/analytics', analyticsRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
