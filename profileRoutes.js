const express = require('express');
const router = express.Router();
const { User } = require('./models');

router.get('/', async (req, res) => {
    try {
        const user = await User.findById(req.user.userId).select('-password');
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

router.put('/update', async (req, res) => {
    try {
        const { name, phone, email } = req.body;
        const user = await User.findByIdAndUpdate(
            req.user.userId,
            { name, phone, email },
            { new: true }
        ).select('-password');
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
