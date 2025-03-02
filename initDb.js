const mongoose = require('mongoose');
const User = require('./userModel');
const Property = require('./propertyModel');
require('dotenv').config();

const initializeDb = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    // Create admin user
    const adminUser = await User.create({
      username: 'admin',
      email: 'admin@example.com',
      password: 'admin',
      role: 'admin'
    });

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
        title: 'Downtown Apartment',
        description: 'Modern 2-bedroom apartment',
        price: 300000,
        location: 'New York, NY',
        owner: adminUser._id
      }
    ];

    await Property.insertMany(properties);
    console.log('Database initialized successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error initializing database:', error);
    process.exit(1);
  }
};

initializeDb();