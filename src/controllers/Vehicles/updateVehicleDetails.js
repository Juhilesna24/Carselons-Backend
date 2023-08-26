const mysql = require('mysql2');
const db = require('../../../db'); // Configure and export database connection

const updateVehicleDetails = async (req, res) => {
  const { make, model, year, mileage } = req.body;
  const id = req.params.id;
  const user_id = req.userId;

  try {
    // Check if the user has already added the same vehicle
    const checkVehicleQuery = 'SELECT * FROM vehicles WHERE id = ? ';
    db.query(checkVehicleQuery, [id], (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ success: false, message: 'Error checking vehicle details' });
      }

      if (!result.length) {
        return res.status(400).json({ success: false, message: 'Vehicle Not Found' });
      }


      // If the vehicle doesn't exist, insert the vehicle details
      const insertVehicleDetailsQuery = 'UPDATE vehicles set make = ?, model = ?, year = ?, mileage = ? WHERE id = ?';
      db.query(insertVehicleDetailsQuery, [make, model, year, mileage, id], (err, result) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ success: false, message: 'Error adding vehicle details' });
        }
        res.status(201).json({ success: true, message: 'Vehicle details updated successfully' });
      });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error adding vehicle details' });
  }
};

module.exports = updateVehicleDetails;
