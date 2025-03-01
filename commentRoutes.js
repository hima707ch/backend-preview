const express = require('express');
const router = express.Router();
const Comment = require('./commentModel');
const auth = require('./authMiddleware');

router.post('/:postId', auth, async (req, res) => {
  try {
    const comment = await Comment.create({
      content: req.body.content,
      author: req.user.userId,
      post: req.params.postId
    });
    res.status(201).json(comment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.put('/:commentId', auth, async (req, res) => {
  try {
    const comment = await Comment.findOneAndUpdate(
      { _id: req.params.commentId, author: req.user.userId },
      { content: req.body.content, updatedAt: Date.now() },
      { new: true }
    );
    if (!comment) return res.status(404).json({ error: 'Comment not found' });
    res.json(comment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete('/:commentId', auth, async (req, res) => {
  try {
    const comment = await Comment.findOneAndDelete({
      _id: req.params.commentId,
      author: req.user.userId
    });
    if (!comment) return res.status(404).json({ error: 'Comment not found' });
    res.json({ message: 'Comment deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;