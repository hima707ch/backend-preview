const express = require('express');
const { User, Property } = require('./models');
const auth = require('./middleware');
const adminAuth = require('./adminMiddleware');
const router = express.Router();

router.get('/users', [auth, adminAuth], async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.delete('/users/:id', [auth, adminAuth], async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    await Property.deleteMany({ owner: req.params.id });
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Delete failed' });
  }
});

router.get('/properties', [auth, adminAuth], async (req, res) => {
  try {
    const properties = await Property.find().populate('owner', 'username');
    res.json(properties);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;