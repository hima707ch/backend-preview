const express = require('express');
const router = express.Router();
const { User, Property } = require('./models');
const auth = require('./middleware');
const adminAuth = require('./adminMiddleware');

router.get('/users', [auth, adminAuth], async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete('/users/:id', [auth, adminAuth], async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    await Property.deleteMany({ owner: req.params.id });
    res.json({ message: 'User and associated properties deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/properties', [auth, adminAuth], async (req, res) => {
  try {
    const properties = await Property.find().populate('owner', 'username email');
    res.json(properties);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;