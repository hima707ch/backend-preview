const express = require('express');
const Property = require('./propertyModel');
const router = express.Router();

// Get all properties for logged-in user
router.get('/', async (req, res) => {
  try {
    const properties = await Property.find({ owner: req.user.userId });
    res.json(properties);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching properties' });
  }
});

// Add new property
router.post('/', async (req, res) => {
  try {
    const { title, description, price, location } = req.body;
    const property = await Property.create({
      title,
      description,
      price,
      location,
      owner: req.user.userId
    });
    res.status(201).json(property);
  } catch (error) {
    res.status(500).json({ message: 'Error creating property' });
  }
});

// Update property
router.put('/:propertyId', async (req, res) => {
  try {
    const property = await Property.findOne({
      _id: req.params.propertyId,
      owner: req.user.userId
    });

    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }

    const updatedProperty = await Property.findByIdAndUpdate(
      req.params.propertyId,
      req.body,
      { new: true }
    );

    res.json(updatedProperty);
  } catch (error) {
    res.status(500).json({ message: 'Error updating property' });
  }
});

// Delete property
router.delete('/:propertyId', async (req, res) => {
  try {
    const property = await Property.findOneAndDelete({
      _id: req.params.propertyId,
      owner: req.user.userId
    });

    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }

    res.json({ message: 'Property deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting property' });
  }
});

module.exports = router;
