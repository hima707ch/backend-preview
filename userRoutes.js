const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('./userModel');
const { verifyToken } = require('./authMiddleware');

router.post('/register', async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const token = jwt.sign({ userId: user._id, isAdmin: user.isAdmin }, 'your_jwt_secret');
    res.json({ token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/user/profile', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('-password');
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.put('/user/profile', verifyToken, async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.user.userId, { profile: req.body }, { new: true }).select('-password');
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;