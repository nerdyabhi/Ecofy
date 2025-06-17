import mongoose from 'mongoose';

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

export default mongoose.model('CarbonActivity', carbonActivitySchema);
