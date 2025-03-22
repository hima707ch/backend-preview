const mongoose = require('mongoose');
const { User, Property } = require('./models');
require('dotenv').config();

const initializeDb = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);

        // Create admin user
        const adminUser = new User({
            username: 'admin',
            password: 'admin',
            email: 'admin@example.com',
            isAdmin: true
        });
        await adminUser.save();

        // Create sample properties
        const properties = [
            {
                title: 'Luxury Villa',
                description: 'Beautiful 4-bedroom villa with pool',
                price: 500000,
                location: 'Miami, FL',
                owner: adminUser._id
            },
            {
                title: 'City Apartment',
                description: 'Modern 2-bedroom apartment in downtown',
                price: 300000,
                location: 'New York, NY',
                owner: adminUser._id
            }
        ];

        await Property.insertMany(properties);
        console.log('Database initialized with sample data');
    } catch (error) {
        console.error('Database initialization failed:', error);
    } finally {
        mongoose.disconnect();
    }
};

initializeDb();