const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const db = require('../../../db'); // Configure and export database connection

const signup = async (req, res, next) => {
  const { name, email, mobileNumber, password, role } = req.body;

  try {
    // Check if the email or mobile number already exist
    const checkExistingQuery = 'SELECT COUNT(*) AS count FROM users WHERE email = ? OR mobile_number = ?';
    db.query(checkExistingQuery, [email, mobileNumber], (existingErr, existingResult) => {
      if (existingErr) {
        console.error(existingErr);
        return next(existingErr); // Pass the error to the error handling middleware
      }

      const { count } = existingResult[0];

      if (count > 0) {
        return res.status(400).json({ success: false, message: 'Email or mobile number already exists' });
      }

      // Hash the password and insert the new user into the database
      bcrypt.hash(password, 10, (hashErr, hashedPassword) => {
        if (hashErr) {
          console.error(hashErr);
          return next(hashErr); // Pass the error to the error handling middleware
        }

        const insertQuery = 'INSERT INTO users (name, email, mobile_number, encrypted_password, role) VALUES (?, ?, ?, ?, ?)';
        db.query(insertQuery, [name, email, mobileNumber, hashedPassword, role], (insertErr) => {
          if (insertErr) {
            console.error(insertErr);
            return next(insertErr); // Pass the error to the error handling middleware
          }
          res.status(201).json({ success: true, message: 'User created successfully' });
        });
      });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating user' });
  }
};

module.exports = signup;
