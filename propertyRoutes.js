const express = require('express');
const router = express.Router();
const Property = require('./propertyModel');
const { auth } = require('./middleware');

router.post('/add', auth, async (req, res) => {
  try {
    const property = new Property({
      ...req.body,
      seller: req.user.userId
    });
    await property.save();
    res.status(201).json(property);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/list', async (req, res) => {
  try {
    const { type, location, minPrice, maxPrice } = req.query;
    let query = {};
    if (type) query.type = type;
    if (location) query.location = new RegExp(location, 'i');
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }
    const properties = await Property.find(query).populate('seller', 'username email');
    res.json(properties);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const property = await Property.findById(req.params.id).populate('seller', 'username email');
    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }
    res.json(property);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;