const express = require('express');
const Property = require('./propertyModel');
const { checkRole } = require('./middleware');

const router = express.Router();

router.get('/list', async (req, res) => {
  try {
    const properties = await Property.find().populate('seller', 'username');
    res.json(properties);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/details/:id', async (req, res) => {
  try {
    const property = await Property.findById(req.params.id).populate('seller', 'username');
    if (!property) {
      return res.status(404).json({ error: 'Property not found' });
    }
    res.json(property);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post('/add', checkRole('seller'), async (req, res) => {
  try {
    const property = new Property({
      ...req.body,
      seller: req.user.userId
    });
    await property.save();
    res.status(201).json(property);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post('/edit/:id', checkRole('seller'), async (req, res) => {
  try {
    const property = await Property.findOneAndUpdate(
      { _id: req.params.id, seller: req.user.userId },
      req.body,
      { new: true }
    );
    if (!property) {
      return res.status(404).json({ error: 'Property not found' });
    }
    res.json(property);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete('/delete/:id', checkRole('seller'), async (req, res) => {
  try {
    const property = await Property.findOneAndDelete({
      _id: req.params.id,
      seller: req.user.userId
    });
    if (!property) {
      return res.status(404).json({ error: 'Property not found' });
    }
    res.json({ message: 'Property deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
