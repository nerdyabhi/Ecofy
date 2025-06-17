import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, enum: ['waste_sale', 'eco_points', 'sharing_reward'], required: true },
  amount: { type: Number, required: true },
  description: String,
  relatedId: mongoose.Schema.Types.ObjectId, // waste item id, shared item id, etc.
  status: { type: String, enum: ['pending', 'completed', 'failed'], default: 'pending' }
}, { timestamps: true });

export default mongoose.model('Transaction', transactionSchema);
