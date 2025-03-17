const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('./userModel');

const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    const userExists = await User.findOne({ username });
    
    if (userExists) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    const user = await User.create({ username, password });
    const token = jwt.sign({ userId: user._id }, 'your_jwt_secret', { expiresIn: '24h' });
    
    res.status(201).json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Error creating user' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user._id }, 'your_jwt_secret', { expiresIn: '24h' });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Error during login' });
  }
});

module.exports = router;
