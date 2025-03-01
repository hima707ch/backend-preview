const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
  title: { type: String, required: true },
  price: { type: Number, required: true },
  address: { type: String, required: true },
  description: String,
  bedrooms: Number,
  bathrooms: Number,
  area: Number,
  imageUrls: [String],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const Property = mongoose.model('Property', propertySchema);
const User = mongoose.model('User', userSchema);

module.exports = { Property, User };