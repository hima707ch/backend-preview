const express = require('express');
const router = express.Router();
const auth = require('./authMiddleware');
const User = require('./userModel');

router.get('/details', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.userId).select('-password');
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

router.put('/update', auth, async (req, res) => {
    try {
        const updates = req.body;
        delete updates.password; // Prevent password update through this route
        
        const user = await User.findByIdAndUpdate(
            req.user.userId,
            updates,
            { new: true }
        ).select('-password');
        
        res.json(user);
    } catch (error) {
        res.status(400).json({ error: 'Update failed' });
    }
});

module.exports = router;
