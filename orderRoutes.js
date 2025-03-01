const express = require('express');
const router = express.Router();
const Order = require('./orderModel');
const auth = require('./authMiddleware');

router.post('/', auth, async (req, res) => {
  try {
    const order = await Order.create({ ...req.body, user: req.user.userId });
    res.status(201).json(order);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/:id', auth, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('products.product');
    if (!order) return res.status(404).json({ error: 'Order not found' });
    if (order.user.toString() !== req.user.userId && !req.user.isAdmin) {
      return res.status(403).json({ error: 'Unauthorized' });
    }
    res.json(order);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/user/:userId', auth, async (req, res) => {
  try {
    if (req.params.userId !== req.user.userId && !req.user.isAdmin) {
      return res.status(403).json({ error: 'Unauthorized' });
    }
    const orders = await Order.find({ user: req.params.userId }).populate('products.product');
    res.json(orders);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;