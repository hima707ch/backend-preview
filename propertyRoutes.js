const express = require('express');
const Property = require('./propertyModel');
const auth = require('./middleware');
const router = express.Router();

router.get('/properties', async (req, res) => {
  try {
    const filters = {};
    if (req.query.minPrice) filters.price = { $gte: Number(req.query.minPrice) };
    if (req.query.maxPrice) filters.price = { ...filters.price, $lte: Number(req.query.maxPrice) };
    if (req.query.location) filters.location = new RegExp(req.query.location, 'i');

    const properties = await Property.find(filters);
    res.json(properties);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching properties' });
  }
});

router.post('/properties', auth, async (req, res) => {
  try {
    const property = await Property.create({ ...req.body, owner: req.user.userId });
    res.status(201).json(property);
  } catch (error) {
    res.status(400).json({ message: 'Error creating property' });
  }
});

router.get('/properties/:id', async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) return res.status(404).json({ message: 'Property not found' });
    res.json(property);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching property' });
  }
});

router.put('/properties/:id', auth, async (req, res) => {
  try {
    const property = await Property.findOneAndUpdate(
      { _id: req.params.id, owner: req.user.userId },
      req.body,
      { new: true }
    );
    if (!property) return res.status(404).json({ message: 'Property not found' });
    res.json(property);
  } catch (error) {
    res.status(400).json({ message: 'Error updating property' });
  }
});

router.delete('/properties/:id', auth, async (req, res) => {
  try {
    const property = await Property.findOneAndDelete({ _id: req.params.id, owner: req.user.userId });
    if (!property) return res.status(404).json({ message: 'Property not found' });
    res.json({ message: 'Property deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting property' });
  }
});

module.exports = router;
