const mongoose = require('mongoose');
const { User, Property } = require('./models');
require('dotenv').config();

const initializeDb = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    // Create admin user
    const adminUser = new User({
      email: 'admin',
      password: 'admin',
      name: 'Admin User',
      role: 'admin'
    });
    await adminUser.save();

    // Create sample properties
    const properties = [
      {
        title: 'Luxury Villa',
        description: 'Beautiful 4-bedroom villa with pool',
        price: 500000,
        location: 'Miami, FL',
        owner: adminUser._id,
        status: 'available'
      },
      {
        title: 'City Apartment',
        description: 'Modern 2-bedroom apartment in downtown',
        price: 300000,
        location: 'New York, NY',
        owner: adminUser._id,
        status: 'available'
      }
    ];

    await Property.insertMany(properties);
    console.log('Database initialized with sample data');
  } catch (error) {
    console.error('Error initializing database:', error);
  } finally {
    mongoose.disconnect();
  }
};

initializeDb();