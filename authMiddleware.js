const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Authentication required' });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

const sellerMiddleware = (req, res, next) => {
  if (req.user.role !== 'seller') {
    return res.status(403).json({ message: 'Seller access required' });
  }
  next();
};

module.exports = { authMiddleware, sellerMiddleware };
