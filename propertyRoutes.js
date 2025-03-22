const express = require('express');
const router = express.Router();
const { Property } = require('./models');
const auth = require('./middleware');

router.get('/properties', async (req, res) => {
    try {
        const properties = await Property.find().populate('owner', 'username email');
        res.json(properties);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

router.post('/properties', auth, async (req, res) => {
    try {
        const property = new Property({ ...req.body, owner: req.user.userId });
        await property.save();
        res.status(201).json(property);
    } catch (error) {
        res.status(400).json({ message: 'Invalid property data' });
    }
});

router.get('/properties/:id', async (req, res) => {
    try {
        const property = await Property.findById(req.params.id).populate('owner');
        if (!property) return res.status(404).json({ message: 'Property not found' });
        res.json(property);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

router.put('/properties/:id', auth, async (req, res) => {
    try {
        const property = await Property.findOneAndUpdate(
            { _id: req.params.id, owner: req.user.userId },
            req.body,
            { new: true }
        );
        if (!property) return res.status(404).json({ message: 'Property not found' });
        res.json(property);
    } catch (error) {
        res.status(400).json({ message: 'Update failed' });
    }
});

router.delete('/properties/:id', auth, async (req, res) => {
    try {
        const property = await Property.findOneAndDelete({ _id: req.params.id, owner: req.user.userId });
        if (!property) return res.status(404).json({ message: 'Property not found' });
        res.json({ message: 'Property deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Deletion failed' });
    }
});

module.exports = router;