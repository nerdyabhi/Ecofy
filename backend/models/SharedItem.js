import mongoose from 'mongoose';

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

export default mongoose.model('SharedItem', sharedItemSchema);
