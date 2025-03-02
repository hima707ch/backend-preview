const mongoose = require('mongoose');
const { User, Property, Analytics } = require('./models');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log('Connected to MongoDB');

    // Create admin user
    await User.create({
      username: 'admin',
      password: 'admin',
      email: 'admin@example.com',
      role: 'admin'
    });

    // Create sample properties
    await Property.create([
      {
        title: 'Luxury Villa',
        description: 'Beautiful villa with ocean view',
        price: 1000000,
        location: 'Miami Beach'
      },
      {
        title: 'City Apartment',
        description: 'Modern apartment in downtown',
        price: 500000,
        location: 'New York City'
      }
    ]);

    // Create sample analytics
    await Analytics.create({
      visits: 100,
      pageViews: 500
    });

    console.log('Sample data created successfully');
    process.exit(0);
  })
  .catch(error => {
    console.error('Error initializing database:', error);
    process.exit(1);
  });