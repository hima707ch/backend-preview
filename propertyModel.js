const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  location: { type: String, required: true },
  bedrooms: { type: Number, required: true },
  bathrooms: { type: Number, required: true },
  area: { type: Number, required: true },
  type: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Property', propertySchema);

// Add sample properties
const Property = mongoose.model('Property', propertySchema);

async function addSampleProperties() {
  try {
    const count = await Property.countDocuments();
    if (count === 0) {
      await Property.insertMany([
        {
          title: 'Modern Apartment',
          description: 'Beautiful modern apartment in city center',
          price: 250000,
          location: 'Downtown',
          bedrooms: 2,
          bathrooms: 1,
          area: 1000,
          type: 'Apartment'
        },
        {
          title: 'Family House',
          description: 'Spacious family house with garden',
          price: 450000,
          location: 'Suburbs',
          bedrooms: 4,
          bathrooms: 2,
          area: 2000,
          type: 'House'
        }
      ]);
      console.log('Sample properties added');
    }
  } catch (error) {
    console.error('Error adding sample properties:', error);
  }
}

addSampleProperties();
