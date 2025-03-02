const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  location: { type: String, required: true },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  features: [String],
  images: [String],
  status: { type: String, enum: ['available', 'sold', 'rented'], default: 'available' }
}, { timestamps: true });

module.exports = mongoose.model('Property', propertySchema);