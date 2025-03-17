const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    location: {
        address: String,
        city: String,
        state: String,
        zipCode: String
    },
    features: [String],
    images: [String],
    type: String,
    status: String,
    createdAt: { type: Date, default: Date.now }
});

const Property = mongoose.model('Property', propertySchema);

// Add sample properties
async function addSampleProperties() {
    try {
        const count = await Property.countDocuments();
        if (count === 0) {
            await Property.insertMany([
                {
                    title: 'Luxury Villa',
                    description: 'Beautiful 4-bedroom villa with pool',
                    price: 500000,
                    location: {
                        address: '123 Main St',
                        city: 'Miami',
                        state: 'FL',
                        zipCode: '33101'
                    },
                    features: ['Pool', 'Garden', 'Garage'],
                    type: 'Villa',
                    status: 'Available'
                },
                {
                    title: 'Modern Apartment',
                    description: '2-bedroom apartment in city center',
                    price: 250000,
                    location: {
                        address: '456 Park Ave',
                        city: 'New York',
                        state: 'NY',
                        zipCode: '10001'
                    },
                    features: ['Elevator', 'Parking', 'Security'],
                    type: 'Apartment',
                    status: 'Available'
                }
            ]);
        }
    } catch (error) {
        console.error('Error adding sample properties:', error);
    }
}

addSampleProperties();

module.exports = Property;
