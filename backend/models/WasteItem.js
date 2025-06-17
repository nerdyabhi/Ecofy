import mongoose from 'mongoose';

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

export default mongoose.model('WasteItem', wasteItemSchema);
