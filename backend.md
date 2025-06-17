# Ecofy Backend - Simple MERN Stack PRD

## 1. Backend Architecture Overview



### Quick Setup Dependencies
```json
{
  "dependencies": {
    "express": "^4.18.2",
    "mongoose": "^7.0.0",
    "jsonwebtoken": "^9.0.0",
    "bcryptjs": "^2.4.3",
    "multer": "^1.4.5",
    "cors": "^2.8.5",
    "dotenv": "^16.0.3",
    "nodemailer": "^6.9.0",
    "axios": "^1.4.0"
  },
  "devDependencies": {
    "nodemon": "^2.0.22"
  }
}
```

## 2. Simple Folder Structure

```
ecofy-backend/
├── config/
│   ├── database.js
│   └── cloudinary.js
├── controllers/
│   ├── authController.js
│   ├── userController.js
│   ├── wasteController.js
│   ├── carbonController.js
│   ├── communityController.js
│   ├── sharingController.js
│   └── analyticsController.js
├── middleware/
│   ├── auth.js
│   ├── upload.js
│   └── validation.js
├── models/
│   ├── User.js
│   ├── WasteItem.js
│   ├── CarbonActivity.js
│   ├── CommunityIssue.js
│   ├── SharedItem.js
│   └── Transaction.js
├── routes/
│   ├── auth.js
│   ├── users.js
│   ├── waste.js
│   ├── carbon.js
│   ├── community.js
│   ├── sharing.js
│   └── analytics.js
├── utils/
│   ├── helpers.js
│   ├── emailService.js
│   └── constants.js
├── uploads/
├── .env
├── .gitignore
├── package.json
└── server.js
```

## 3. API Endpoints

### 3.1 Authentication APIs
```
POST   /api/auth/register          # User registration
POST   /api/auth/login             # User login
GET    /api/auth/me                # Get current user
POST   /api/auth/forgot-password   # Send reset email
POST   /api/auth/reset-password    # Reset password
```

### 3.2 User APIs
```
GET    /api/users/profile          # Get user profile
PUT    /api/users/profile          # Update profile
GET    /api/users/dashboard        # Dashboard data
PUT    /api/users/location         # Update location
```

### 3.3 Waste Management APIs
```
POST   /api/waste/add              # Add waste item
GET    /api/waste/my-items         # Get user's waste items
PUT    /api/waste/:id              # Update waste item
DELETE /api/waste/:id              # Delete waste item
GET    /api/waste/recyclers        # Get nearby recyclers
POST   /api/waste/sell             # Sell waste to recycler
GET    /api/waste/transactions     # Get transactions
```

### 3.4 Carbon Footprint APIs
```
POST   /api/carbon/add-activity    # Log carbon activity
GET    /api/carbon/activities      # Get activities
PUT    /api/carbon/:id             # Update activity
DELETE /api/carbon/:id             # Delete activity
GET    /api/carbon/summary         # Get carbon summary
GET    /api/carbon/trends          # Get monthly trends
```

### 3.5 Community Issues APIs
```
POST   /api/community/report       # Report new issue
GET    /api/community/issues       # Get all issues
GET    /api/community/issues/:id   # Get specific issue
PUT    /api/community/issues/:id   # Update issue
DELETE /api/community/issues/:id   # Delete issue
POST   /api/community/vote/:id     # Vote on issue
POST   /api/community/comment/:id  # Comment on issue
GET    /api/community/nearby       # Get nearby issues
```

### 3.6 Sharing Economy APIs
```
POST   /api/sharing/list-item      # List item for sharing
GET    /api/sharing/items          # Browse items
GET    /api/sharing/items/:id      # Get specific item
PUT    /api/sharing/items/:id      # Update item
DELETE /api/sharing/items/:id      # Remove item
POST   /api/sharing/request/:id    # Request to borrow
GET    /api/sharing/my-items       # Get user's items
GET    /api/sharing/my-requests    # Get requests
POST   /api/sharing/review         # Rate experience
```

### 3.7 Analytics APIs
```
GET    /api/analytics/overview     # User's impact overview
GET    /api/analytics/eco-points   # Eco-points balance
GET    /api/analytics/leaderboard  # Community leaderboard
GET    /api/analytics/achievements # User achievements
```

## 4. MongoDB Schema Models

### 4.1 User Model
```javascript
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  phone: String,
  profileImage: String,
  location: {
    type: { type: String, default: 'Point' },
    coordinates: [Number], // [longitude, latitude]
    address: String
  },
  ecoPoints: { type: Number, default: 0 },
  carbonScore: { type: Number, default: 0 },
  isVerified: { type: Boolean, default: false },
  preferences: {
    notifications: { type: Boolean, default: true },
    language: { type: String, default: 'en' }
  }
}, { timestamps: true });
```

### 4.2 Waste Item Model
```javascript
const wasteItemSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  category: { type: String, required: true }, // plastic, paper, metal, electronic
  description: String,
  quantity: { type: Number, required: true },
  unit: { type: String, required: true }, // kg, pieces, liters
  images: [String],
  location: {
    type: { type: String, default: 'Point' },
    coordinates: [Number],
    address: String
  },
  status: { type: String, enum: ['available', 'sold', 'collected'], default: 'available' },
  estimatedValue: Number,
  actualValue: Number,
  recyclerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });
```

### 4.3 Carbon Activity Model
```javascript
const carbonActivitySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  category: { type: String, required: true }, // transport, electricity, food, waste
  activityType: { type: String, required: true }, // car, bus, beef, etc.
  quantity: { type: Number, required: true },
  unit: String, // km, kWh, kg
  carbonEmission: { type: Number, required: true }, // CO2 in kg
  date: { type: Date, default: Date.now },
  notes: String
}, { timestamps: true });
```

### 4.4 Community Issue Model
```javascript
const communityIssueSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true }, // pothole, streetlight, waste, water
  priority: { type: String, enum: ['low', 'medium', 'high'], default: 'medium' },
  status: { type: String, enum: ['open', 'in-progress', 'resolved', 'closed'], default: 'open' },
  images: [String],
  location: {
    type: { type: String, default: 'Point' },
    coordinates: [Number],
    address: String
  },
  votes: { type: Number, default: 0 },
  votedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  comments: [{
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    text: String,
    createdAt: { type: Date, default: Date.now }
  }],
  notifiedAuthorities: [String], // emails of notified authorities
  authorityResponse: String
}, { timestamps: true });
```

### 4.5 Shared Item Model
```javascript
const sharedItemSchema = new mongoose.Schema({
  ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  description: String,
  category: { type: String, required: true }, // tools, appliances, books, sports
  images: [String],
  location: {
    type: { type: String, default: 'Point' },
    coordinates: [Number],
    address: String
  },
  availability: { type: Boolean, default: true },
  condition: { type: String, enum: ['excellent', 'good', 'fair'], default: 'good' },
  borrowRequests: [{
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    message: String,
    requestDate: { type: Date, default: Date.now },
    status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' }
  }],
  currentBorrower: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  borrowHistory: [{
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    borrowDate: Date,
    returnDate: Date,
    rating: Number,
    review: String
  }]
}, { timestamps: true });
```

### 4.6 Transaction Model
```javascript
const transactionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, enum: ['waste_sale', 'eco_points', 'sharing_reward'], required: true },
  amount: { type: Number, required: true },
  description: String,
  relatedId: mongoose.Schema.Types.ObjectId, // waste item id, shared item id, etc.
  status: { type: String, enum: ['pending', 'completed', 'failed'], default: 'pending' }
}, { timestamps: true });
```

## 5. Quick Implementation Guide

### 5.1 Server Setup (server.js)
```javascript
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// Database connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));
app.use('/api/waste', require('./routes/waste'));
app.use('/api/carbon', require('./routes/carbon'));
app.use('/api/community', require('./routes/community'));
app.use('/api/sharing', require('./routes/sharing'));
app.use('/api/analytics', require('./routes/analytics'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
```

### 5.2 Environment Variables (.env)
```
MONGODB_URI=mongodb://localhost:27017/ecofy
JWT_SECRET=your_jwt_secret_key
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
```

### 5.3 Authentication Middleware
```javascript
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = auth;
```

## 6. Development Workflow

### Setup Commands
```bash
# Initialize project
npm init -y
npm install express mongoose jsonwebtoken bcryptjs multer cors dotenv nodemailer axios
npm install -D nodemon

# Start development server
npm run dev
```

### Package.json Scripts
```json
{
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  }
}
```

## 7. Quick Integration Features

### 7.1 Eco-Points System
- Waste recycling: +10 points per kg
- Carbon reduction: +5 points per kg CO2 saved
- Community reporting: +20 points per resolved issue
- Item sharing: +15 points per successful share

### 7.2 Gamification
- Achievement badges stored in user model
- Community leaderboard with monthly resets
- Challenge system with group goals

### 7.3 Notifications
- Email notifications for issue updates
- Push notifications for borrow requests
- Weekly sustainability reports

This setup provides a rapid development foundation for your hackathon project with all core features integrated through a simple MERN stack architecture.