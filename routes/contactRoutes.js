const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');

// Submit Contact Form
router.post('/submit', async (req, res) => {
  try {
    const contact = new Contact(req.body);
    await contact.save();
    res.status(201).json({ message: 'Contact form submitted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;