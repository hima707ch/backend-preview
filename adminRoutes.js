const express = require('express');
const router = express.Router();
const { User, Analytics } = require('./models');
const auth = require('./middleware/auth');
const admin = require('./middleware/admin');

router.get('/analytics', [auth, admin], async (req, res) => {
  try {
    const analytics = await Analytics.find();
    res.json(analytics);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.put('/users/:id', [auth, admin], async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    ).select('-password');
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete('/users/:id', [auth, admin], async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;