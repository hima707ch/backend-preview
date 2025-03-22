const express = require('express');
const Property = require('./propertyModel');
const { authMiddleware, sellerMiddleware } = require('./authMiddleware');

const router = express.Router();

// Get all properties with filters
router.get('/properties', async (req, res) => {
  try {
    const { minPrice, maxPrice, location } = req.query;
    let query = {};
    
    if (minPrice) query.price = { $gte: Number(minPrice) };
    if (maxPrice) query.price = { ...query.price, $lte: Number(maxPrice) };
    if (location) query.location = new RegExp(location, 'i');

    const properties = await Property.find(query).populate('seller', 'username');
    res.json(properties);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get specific property
router.get('/properties/:id', async (req, res) => {
  try {
    const property = await Property.findById(req.params.id).populate('seller', 'username');
    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }
    res.json(property);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Add new property (sellers only)
router.post('/properties', [authMiddleware, sellerMiddleware], async (req, res) => {
  try {
    const property = await Property.create({
      ...req.body,
      seller: req.user.userId
    });
    res.status(201).json(property);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update property
router.put('/properties/:id', [authMiddleware, sellerMiddleware], async (req, res) => {
  try {
    const property = await Property.findOne({
      _id: req.params.id,
      seller: req.user.userId
    });
    
    if (!property) {
      return res.status(404).json({ message: 'Property not found or unauthorized' });
    }
    
    Object.assign(property, req.body);
    await property.save();
    res.json(property);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete property
router.delete('/properties/:id', [authMiddleware, sellerMiddleware], async (req, res) => {
  try {
    const property = await Property.findOneAndDelete({
      _id: req.params.id,
      seller: req.user.userId
    });
    
    if (!property) {
      return res.status(404).json({ message: 'Property not found or unauthorized' });
    }
    
    res.json({ message: 'Property deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
