const express = require('express');
const router = express.Router();
const Post = require('./postModel');
const auth = require('./authMiddleware');

router.get('/', async (req, res) => {
  try {
    const { category } = req.query;
    const query = category ? { category } : {};
    const posts = await Post.find(query).populate('author', 'username');
    res.json(posts);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/:userId', async (req, res) => {
  try {
    const posts = await Post.find({ author: req.params.userId }).populate('author', 'username');
    res.json(posts);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post('/', auth, async (req, res) => {
  try {
    const post = await Post.create({ ...req.body, author: req.user.userId });
    res.status(201).json(post);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.put('/:postId', auth, async (req, res) => {
  try {
    const post = await Post.findOneAndUpdate(
      { _id: req.params.postId, author: req.user.userId },
      { ...req.body, updatedAt: Date.now() },
      { new: true }
    );
    if (!post) return res.status(404).json({ error: 'Post not found' });
    res.json(post);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete('/:postId', auth, async (req, res) => {
  try {
    const post = await Post.findOneAndDelete({ _id: req.params.postId, author: req.user.userId });
    if (!post) return res.status(404).json({ error: 'Post not found' });
    res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;