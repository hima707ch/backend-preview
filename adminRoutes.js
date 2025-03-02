const express = require('express');
const router = express.Router();
const User = require('./userModel');
const Property = require('./propertyModel');

const isAdmin = async (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Admin access required' });
  }
  next();
};

router.get('/users', isAdmin, async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete('/users/:userId', isAdmin, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.userId);
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get('/listings', isAdmin, async (req, res) => {
  try {
    const properties = await Property.find().populate('owner', 'username email');
    res.json(properties);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.put('/listings/:listingId', isAdmin, async (req, res) => {
  try {
    const property = await Property.findByIdAndUpdate(
      req.params.listingId,
      req.body,
      { new: true }
    );
    res.json(property);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete('/listings/:listingId', isAdmin, async (req, res) => {
  try {
    await Property.findByIdAndDelete(req.params.listingId);
    res.json({ message: 'Listing deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;