import mongoose from 'mongoose';

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

export default mongoose.model('User', userSchema);
