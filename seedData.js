const mongoose = require('mongoose');
const User = require('./models/User');
const Post = require('./models/Post');
const Comment = require('./models/Comment');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI)
  .then(async () => {
    // Create admin user
    const adminUser = await User.create({
      username: 'admin',
      email: 'admin@example.com',
      password: 'admin'
    });

    // Create sample post
    const samplePost = await Post.create({
      title: 'Welcome to our Blog',
      content: 'This is a sample blog post.',
      author: adminUser._id,
      category: 'General'
    });

    // Create sample comment
    await Comment.create({
      content: 'Great first post!',
      author: adminUser._id,
      post: samplePost._id
    });

    console.log('Sample data created successfully');
    process.exit(0);
  })
  .catch(error => {
    console.error('Error seeding data:', error);
    process.exit(1);
  });
