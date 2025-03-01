const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);

// Create default admin user
const bcrypt = require('bcryptjs');
const User = mongoose.model('User', userSchema);

async function createAdminUser() {
  try {
    const adminExists = await User.findOne({ email: 'admin' });
    if (!adminExists) {
      const hashedPassword = await bcrypt.hash('admin', 10);
      await User.create({
        email: 'admin',
        password: hashedPassword,
        name: 'Admin User'
      });
      console.log('Admin user created');
    }
  } catch (error) {
    console.error('Error creating admin user:', error);
  }
}

createAdminUser();
