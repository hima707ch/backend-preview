const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./userModel');
const Property = require('./propertyModel');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log('Connected to MongoDB');

    // Create admin user
    const hashedPassword = await bcrypt.hash('admin', 10);
    const adminUser = new User({
      username: 'admin',
      password: hashedPassword,
      email: 'admin@example.com'
    });
    await adminUser.save();

    // Create sample properties
    const sampleProperties = [
      {
        title: 'Luxury Villa',
        description: 'Beautiful villa with ocean view',
        price: 1000000,
        location: 'Miami Beach',
        type: 'Villa',
        bedrooms: 4,
        bathrooms: 3,
        area: 3000,
        owner: adminUser._id
      },
      {
        title: 'City Apartment',
        description: 'Modern apartment in downtown',
        price: 500000,
        location: 'New York City',
        type: 'Apartment',
        bedrooms: 2,
        bathrooms: 2,
        area: 1200,
        owner: adminUser._id
      }
    ];

    await Property.insertMany(sampleProperties);
    console.log('Sample data inserted');
    process.exit(0);
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });
