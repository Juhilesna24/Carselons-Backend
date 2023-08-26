const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const token = (req.header('Authorization')).split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Authorization token missing' });
  }


  jwt.verify(token, 'your-secret-key', (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    req.userId = decoded.userId;
    req.role = decoded.role;
    next();
  });
};

module.exports = verifyToken;
