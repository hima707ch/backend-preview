const express = require('express');
const Property = require('./propertyModel');
const authMiddleware = require('./authMiddleware');

const router = express.Router();

// Get all properties
router.get('/', async (req, res) => {
    try {
        const properties = await Property.find().populate('owner', 'username');
        res.json(properties);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching properties' });
    }
});

// Get single property
router.get('/:id', async (req, res) => {
    try {
        const property = await Property.findById(req.params.id).populate('owner', 'username');
        if (!property) {
            return res.status(404).json({ message: 'Property not found' });
        }
        res.json(property);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching property' });
    }
});

// Create property
router.post('/', authMiddleware, async (req, res) => {
    try {
        const property = await Property.create({
            ...req.body,
            owner: req.user.userId
        });
        res.status(201).json(property);
    } catch (error) {
        res.status(500).json({ message: 'Error creating property' });
    }
});

// Update property
router.put('/:id', authMiddleware, async (req, res) => {
    try {
        const property = await Property.findById(req.params.id);
        if (!property) {
            return res.status(404).json({ message: 'Property not found' });
        }

        if (property.owner.toString() !== req.user.userId) {
            return res.status(403).json({ message: 'Not authorized' });
        }

        const updatedProperty = await Property.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.json(updatedProperty);
    } catch (error) {
        res.status(500).json({ message: 'Error updating property' });
    }
});

// Delete property
router.delete('/:id', authMiddleware, async (req, res) => {
    try {
        const property = await Property.findById(req.params.id);
        if (!property) {
            return res.status(404).json({ message: 'Property not found' });
        }

        if (property.owner.toString() !== req.user.userId) {
            return res.status(403).json({ message: 'Not authorized' });
        }

        await Property.findByIdAndDelete(req.params.id);
        res.json({ message: 'Property deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting property' });
    }
});

module.exports = router;
