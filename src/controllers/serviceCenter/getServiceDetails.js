const db = require('../../../db'); // Configure and export database connection

// Fetch bookings for a specific user
const fetchServiceDetails = (req, res) => {
  // const userId = req.userId;
  const service_center_id = req.params.id;
  const fetchServiceDetailsQuery = 'SELECT * FROM service_bookings WHERE service_center_id = ? AND status IN ("inprogress", "pending")';

  db.query(fetchServiceDetailsQuery, [service_center_id], (err, bookingResults) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Error checking booking details' });
    }

    const bookingPromises = bookingResults.map(booking => {
      const fetchVehicleQuery = 'SELECT * FROM vehicles WHERE id = ?';
      const vehiclePromise = new Promise((resolve, reject) => {
        db.query(fetchVehicleQuery, [booking.vehicle_id], (vehicleErr, vehicleResult) => {
          if (vehicleErr) {
            reject(vehicleErr);
          } else {
            resolve(vehicleResult[0]);
          }
        });
      });

      return Promise.all([vehiclePromise])
        .then(([vehicle]) => {
          return {
            booking: booking,
            vehicle: vehicle
          };
        });
    });

    Promise.all(bookingPromises)
      .then(bookingDetails => {
        res.status(200).json({ data: bookingDetails });
      })
      .catch(error => {
        console.error(error);
        res.status(500).json({ message: 'Error fetching booking details' });
      });
  });
};

module.exports = fetchServiceDetails;
