const mongoose = require('mongoose');
const { User, Property } = require('./models');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI)
  .then(async () => {
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
        description: 'Beautiful villa with ocean view',
        price: 1000000,
        location: 'Miami Beach',
        owner: adminUser._id
      },
      {
        title: 'City Apartment',
        description: 'Modern apartment in downtown',
        price: 500000,
        location: 'New York City',
        owner: adminUser._id
      }
    ];

    await Property.insertMany(properties);
    console.log('Sample data inserted successfully');
    process.exit(0);
  })
  .catch(err => {
    console.error('Database initialization failed:', err);
    process.exit(1);
  });