const express = require('express');
const router = express.Router();
const { User, Property } = require('./models');
const auth = require('./middleware');

router.get('/user/:id', auth, async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put('/user/:id', auth, async (req, res) => {
  try {
    if (req.user.userId !== req.params.id) {
      return res.status(403).json({ message: 'Unauthorized' });
    }
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true }).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get('/user/properties', auth, async (req, res) => {
  try {
    const properties = await Property.find({ owner: req.user.userId });
    res.json(properties);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;