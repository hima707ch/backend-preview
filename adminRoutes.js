const express = require('express');
const router = express.Router();
const { User, Property } = require('./models');
const auth = require('./middleware');
const adminAuth = require('./adminMiddleware');

router.get('/dashboard', [auth, adminAuth], async (req, res) => {
  try {
    const userCount = await User.countDocuments();
    const propertyCount = await Property.countDocuments();
    const recentProperties = await Property.find()
      .sort('-createdAt')
      .limit(5)
      .populate('owner', 'name email');
    const recentUsers = await User.find()
      .sort('-createdAt')
      .limit(5)
      .select('-password');

    res.json({
      stats: {
        users: userCount,
        properties: propertyCount
      },
      recentProperties,
      recentUsers
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;