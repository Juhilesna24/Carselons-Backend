const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); // For generating JWT tokens
const db = require('../../../db'); // Configure and export database connection

const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const getUserQuery = 'SELECT * FROM users WHERE email = ?';
    db.query(getUserQuery, [email], async (getUserErr, getUserResult) => {
      if (getUserErr) {
        console.error(getUserErr);
        return next(getUserErr);
      }

      const user = getUserResult[0];
      if (!user) {
        return res.status(401).json({ success: false, message: 'Invalid credentials' });
      }

      const isPasswordValid = await bcrypt.compare(password, user.encrypted_password);
      if (!isPasswordValid) {
        return res.status(401).json({ success: false, message: 'Invalid credentials' });
      }

      // Generate and send JWT token
      const token = jwt.sign({ userId: user.id, role: user.role }, 'your-secret-key', { expiresIn: '1h' });
      res.status(200).json({  success: true, token, user: user });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error during login' });
  }
};

module.exports = login;
