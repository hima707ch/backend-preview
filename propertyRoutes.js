const express = require('express');
const router = express.Router();
const { Property } = require('./models');
const { authenticateToken } = require('./middleware');

router.get('/', async (req, res) => {
    try {
        const properties = await Property.find().populate('owner', 'username email');
        res.json(properties);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const property = await Property.findById(req.params.id).populate('owner', 'username email');
        if (!property) {
            return res.status(404).json({ message: 'Property not found' });
        }
        res.json(property);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

router.post('/user/properties/add', authenticateToken, async (req, res) => {
    try {
        const property = new Property({
            ...req.body,
            owner: req.user.userId
        });
        await property.save();
        res.status(201).json(property);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

router.put('/user/properties/:id/edit', authenticateToken, async (req, res) => {
    try {
        const property = await Property.findOne({ _id: req.params.id, owner: req.user.userId });
        if (!property) {
            return res.status(404).json({ message: 'Property not found or unauthorized' });
        }
        Object.assign(property, req.body);
        await property.save();
        res.json(property);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

router.delete('/user/properties/:id/delete', authenticateToken, async (req, res) => {
    try {
        const property = await Property.findOneAndDelete({ _id: req.params.id, owner: req.user.userId });
        if (!property) {
            return res.status(404).json({ message: 'Property not found or unauthorized' });
        }
        res.json({ message: 'Property deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
