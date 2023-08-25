const db = require('../../../db'); // Configure and export database connection

// Fetch vehicle details for a specific user
const fetchVehicles = (req, res) => {
  const userId = req.userId;
  const fetchVehiclesQuery = 'SELECT * FROM vehicles WHERE user_id = ?';

  db.query(fetchVehiclesQuery, [userId], (err, results) => {
    if (err) {
      console.error(err);
        return res.status(500).json({ message: 'Error checking vehicle details' });
    }

    res.status(201).json({ data: results });
  });
};

module.exports = fetchVehicles;
