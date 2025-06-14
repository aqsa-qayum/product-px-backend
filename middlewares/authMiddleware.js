const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET; 

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Format: Bearer <token>

  if (!token) return res.status(403).json({ success: false, message: 'Token missing' });

  jwt.verify(token, secretKey, (err, user) => {
    if (err) return res.status(403).json({ success: false, message: 'Invalid Token' });
    req.user = user; // Save decoded user info in request
    next();
  });
};

module.exports = authenticateToken;
