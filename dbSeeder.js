const mongoose = require('mongoose');
const User = require('./userModel');
const Property = require('./propertyModel');
require('dotenv').config();

const seedDatabase = async () => {
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
        features: ['Elevator', 'Gym', 'Security'],
        status: 'available'
      }
    ];

    await Property.insertMany(properties);
    console.log('Database seeded successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();