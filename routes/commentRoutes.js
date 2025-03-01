const express = require('express');
const router = express.Router();
const Comment = require('../models/Comment');
const auth = require('../middleware/auth');

router.post('/:postId', auth, async (req, res) => {
  try {
    const comment = new Comment({
      content: req.body.content,
      author: req.user.userId,
      post: req.params.postId
    });
    await comment.save();
    res.status(201).json(comment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.put('/:commentId', auth, async (req, res) => {
  try {
    const comment = await Comment.findOneAndUpdate(
      { _id: req.params.commentId, author: req.user.userId },
      { content: req.body.content },
      { new: true }
    );
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }
    res.json(comment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete('/:commentId', auth, async (req, res) => {
  try {
    const comment = await Comment.findOneAndDelete({
      _id: req.params.commentId,
      author: req.user.userId
    });
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }
    res.json({ message: 'Comment deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
