const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { User, Property } = require('./models');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

async function seedData() {
    try {
        await User.deleteMany({});
        await Property.deleteMany({});

        const adminUser = await User.create({
            username: 'admin',
            email: 'admin',
            password: 'admin',
            name: 'Admin User',
            phone: '1234567890'
        });

        const properties = [
            {
                title: 'Luxury Villa',
                description: 'Beautiful villa with ocean view',
                price: 1000000,
                location: 'Miami Beach',
                owner: adminUser._id,
                features: ['Pool', 'Garden', 'Garage'],
                status: 'available'
            },
            {
                title: 'City Apartment',
                description: 'Modern apartment in downtown',
                price: 500000,
                location: 'New York City',
                owner: adminUser._id,
                features: ['Balcony', 'Gym', 'Parking'],
                status: 'available'
            }
        ];

        await Property.insertMany(properties);
        console.log('Seed data inserted successfully');
        process.exit(0);
    } catch (error) {
        console.error('Error seeding data:', error);
        process.exit(1);
    }
}

seedData();
