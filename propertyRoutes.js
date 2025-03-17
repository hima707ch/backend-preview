const express = require('express');
const router = express.Router();
const Property = require('./propertyModel');

router.get('/properties/search', async (req, res) => {
    try {
        const { type, city, minPrice, maxPrice } = req.query;
        let query = {};

        if (type) query.type = type;
        if (city) query['location.city'] = city;
        if (minPrice || maxPrice) {
            query.price = {};
            if (minPrice) query.price.$gte = Number(minPrice);
            if (maxPrice) query.price.$lte = Number(maxPrice);
        }

        const properties = await Property.find(query);
        res.json(properties);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

router.get('/properties/:id', async (req, res) => {
    try {
        const property = await Property.findById(req.params.id);
        if (!property) {
            return res.status(404).json({ message: 'Property not found' });
        }
        res.json(property);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
