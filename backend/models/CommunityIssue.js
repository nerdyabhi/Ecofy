import mongoose from 'mongoose';

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

export default mongoose.model('CommunityIssue', communityIssueSchema);
