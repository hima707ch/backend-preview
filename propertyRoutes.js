const express = require('express');
const router = express.Router();
const Property = require('./propertyModel');
const { verifyToken } = require('./middleware');

router.get('/', async (req, res) => {
  try {
    const properties = await Property.find(req.query);
    res.json(properties);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.post('/', verifyToken, async (req, res) => {
  try {
    const property = new Property({ ...req.body, owner: req.user._id });
    await property.save();
    res.status(201).json(property);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) return res.status(404).json({ message: 'Property not found' });
    res.json(property);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.put('/:id', verifyToken, async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) return res.status(404).json({ message: 'Property not found' });
    if (property.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }
    Object.assign(property, req.body);
    await property.save();
    res.json(property);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete('/:id', verifyToken, async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) return res.status(404).json({ message: 'Property not found' });
    if (property.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }
    await property.remove();
    res.json({ message: 'Property deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;