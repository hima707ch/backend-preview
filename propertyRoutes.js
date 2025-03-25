const express = require('express');
const router = express.Router();
const auth = require('./authMiddleware');
const Property = require('./propertyModel');

router.get('/list', async (req, res) => {
    try {
        const properties = await Property.find(req.query)
            .populate('owner', 'username email');
        res.json(properties);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

router.get('/detail/:id', async (req, res) => {
    try {
        const property = await Property.findById(req.params.id)
            .populate('owner', 'username email');
        if (!property) {
            return res.status(404).json({ error: 'Property not found' });
        }
        res.json(property);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

router.post('/create', auth, async (req, res) => {
    try {
        const property = new Property({
            ...req.body,
            owner: req.user.userId
        });
        await property.save();
        res.status(201).json(property);
    } catch (error) {
        res.status(400).json({ error: 'Creation failed' });
    }
});

router.put('/update/:id', auth, async (req, res) => {
    try {
        const property = await Property.findOne({
            _id: req.params.id,
            owner: req.user.userId
        });
        
        if (!property) {
            return res.status(404).json({ error: 'Property not found' });
        }
        
        Object.assign(property, req.body);
        await property.save();
        res.json(property);
    } catch (error) {
        res.status(400).json({ error: 'Update failed' });
    }
});

router.delete('/delete/:id', auth, async (req, res) => {
    try {
        const property = await Property.findOneAndDelete({
            _id: req.params.id,
            owner: req.user.userId
        });
        
        if (!property) {
            return res.status(404).json({ error: 'Property not found' });
        }
        
        res.json({ message: 'Property deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Deletion failed' });
    }
});

module.exports = router;
