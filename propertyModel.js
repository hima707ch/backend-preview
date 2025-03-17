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
                        address: '123 Luxury Lane',
                        city: 'Beverly Hills',
                        state: 'CA',
                        zipCode: '90210'
                    },
                    features: ['Pool', 'Garden', 'Garage'],
                    images: ['villa1.jpg', 'villa2.jpg']
                },
                {
                    title: 'City Apartment',
                    description: 'Modern 2-bedroom apartment',
                    price: 300000,
                    location: {
                        address: '456 Urban Street',
                        city: 'New York',
                        state: 'NY',
                        zipCode: '10001'
                    },
                    features: ['Balcony', 'Gym', 'Parking'],
                    images: ['apt1.jpg', 'apt2.jpg']
                }
            ]);
        }
    } catch (error) {
        console.error('Error adding sample properties:', error);
    }
}

addSampleProperties();

module.exports = Property;
