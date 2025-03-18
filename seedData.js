const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./userModel');
const Property = require('./propertyModel');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI)
  .then(async () => {
    // Create admin user
    const adminPassword = await bcrypt.hash('admin', 10);
    const adminUser = new User({
      username: 'admin',
      email: 'admin',
      password: adminPassword,
      role: 'admin'
    });
    await adminUser.save();

    // Create sample property
    const sampleProperty = new Property({
      title: 'Luxury Apartment',
      description: 'Beautiful apartment with ocean view',
      type: 'apartment',
      price: 500000,
      location: 'Miami Beach',
      bedrooms: 3,
      bathrooms: 2,
      area: 2000,
      seller: adminUser._id
    });
    await sampleProperty.save();

    console.log('Sample data created successfully');
    process.exit();
  })
  .catch(err => {
    console.error('Error seeding data:', err);
    process.exit(1);
  });