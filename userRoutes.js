const express = require('express');
const router = express.Router();
const User = require('./userModel');

router.get('/user/:userId', async (req, res) => {
    try {
        const user = await User.findById(req.params.userId)
            .select('-password')
            .populate('savedProperties');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

router.post('/user/:userId/update', async (req, res) => {
    try {
        const { name, phone, address } = req.body;
        const user = await User.findByIdAndUpdate(
            req.params.userId,
            { 
                'profile.name': name,
                'profile.phone': phone,
                'profile.address': address
            },
            { new: true }
        ).select('-password');
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

router.post('/user/:userId/save-property', async (req, res) => {
    try {
        const { propertyId } = req.body;
        const user = await User.findByIdAndUpdate(
            req.params.userId,
            { $addToSet: { savedProperties: propertyId } },
            { new: true }
        ).select('-password');
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

router.delete('/user/:userId/remove-property/:propertyId', async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(
            req.params.userId,
            { $pull: { savedProperties: req.params.propertyId } },
            { new: true }
        ).select('-password');
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
