const mysql = require('mysql2');
const db = require('../../../db'); // Configure and export database connection

const addVehicleDetails = async (req, res) => {
  const { make, model, year, mileage } = req.body;
  const user_id = req.userId;

  try {
    // Check if the user has already added the same vehicle
    const checkVehicleQuery = 'SELECT * FROM vehicles WHERE user_id = ? AND make = ? AND model = ? AND year = ?';
    db.query(checkVehicleQuery, [user_id, make, model, year], (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: 'Error checking vehicle details' });
      }

      if (result.length > 0) {
        return res.status(400).json({ message: 'Vehicle already added for the user' });
      }

      // If the vehicle doesn't exist, insert the vehicle details
      const insertVehicleDetailsQuery = 'INSERT INTO vehicles (user_id, make, model, year, mileage) VALUES (?, ?, ?, ?, ?)';
      db.query(insertVehicleDetailsQuery, [user_id, make, model, year, mileage], (err, result) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ message: 'Error adding vehicle details' });
        }
        res.status(201).json({ message: 'Vehicle details added successfully' });
      });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error adding vehicle details' });
  }
};

module.exports = addVehicleDetails;
