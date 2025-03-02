const express = require('express');
const router = express.Router();
const User = require('./userModel');
const Property = require('./propertyModel');

const adminCheck = (req, res, next) => {
  if (!req.user.isAdmin) return res.status(403).json({ error: 'Admin access required' });
  next();
};

router.use(adminCheck);

router.get('/users', async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete('/users/:userId', async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.userId);
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/listings', async (req, res) => {
  try {
    const listings = await Property.find().populate('owner', 'username email');
    res.json(listings);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.put('/listings/:listingId', async (req, res) => {
  try {
    const listing = await Property.findByIdAndUpdate(req.params.listingId, req.body, { new: true });
    res.json(listing);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete('/listings/:listingId', async (req, res) => {
  try {
    await Property.findByIdAndDelete(req.params.listingId);
    res.json({ message: 'Listing deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;