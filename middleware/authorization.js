const jwt = require('jsonwebtoken');

const validateToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized - Token not provided' });
  }

  jwt.verify(token.split(' ')[1], process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Forbidden - Invalid token' });
    }

    req.user = decoded;
    next();
  });
};

module.exports = validateToken;
