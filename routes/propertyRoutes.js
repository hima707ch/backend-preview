const express = require('express');
const router = express.Router();
const Property = require('../models/Property');
const auth = require('../middleware/auth');

// List Properties
router.get('/', async (req, res) => {
  try {
    const filters = {};
    if (req.query.type) filters.type = req.query.type;
    if (req.query.location) filters.location = new RegExp(req.query.location, 'i');
    if (req.query.minPrice) filters.price = { $gte: req.query.minPrice };
    if (req.query.maxPrice) filters.price = { ...filters.price, $lte: req.query.maxPrice };
    
    const properties = await Property.find(filters);
    res.json(properties);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get Property Detail
router.get('/:id', async (req, res) => {
  try {
    const property = await Property.findById(req.params.id).populate('owner', 'name email');
    if (!property) throw new Error('Property not found');
    res.json(property);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

// Create Property
router.post('/', auth, async (req, res) => {
  try {
    const property = new Property({
      ...req.body,
      owner: req.user.userId
    });
    await property.save();
    res.status(201).json(property);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update Property
router.put('/:id', auth, async (req, res) => {
  try {
    const property = await Property.findOne({ _id: req.params.id, owner: req.user.userId });
    if (!property) throw new Error('Property not found or unauthorized');
    Object.assign(property, req.body);
    await property.save();
    res.json(property);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete Property
router.delete('/:id', auth, async (req, res) => {
  try {
    const property = await Property.findOneAndDelete({ _id: req.params.id, owner: req.user.userId });
    if (!property) throw new Error('Property not found or unauthorized');
    res.json({ message: 'Property deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;