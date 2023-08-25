const db = require('../../../db'); // Configure and export database connection

// Fetch bookings for a specific user
const fetchBookings = (req, res) => {
  const userId = req.userId;
  const fetchBookingsQuery = 'SELECT * FROM service_bookings WHERE user_id = ?';

  db.query(fetchBookingsQuery, [userId], (err, bookingResults) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Error checking booking details' });
    }

    const bookingPromises = bookingResults.map(booking => {
      const fetchVehicleQuery = 'SELECT * FROM vehicles WHERE id = ?';
      const fetchServiceCenterQuery = 'SELECT * FROM service_centers WHERE id = ?';

      const vehiclePromise = new Promise((resolve, reject) => {
        db.query(fetchVehicleQuery, [booking.vehicle_id], (vehicleErr, vehicleResult) => {
          if (vehicleErr) {
            reject(vehicleErr);
          } else {
            resolve(vehicleResult[0]);
          }
        });
      });

      const serviceCenterPromise = new Promise((resolve, reject) => {
        db.query(fetchServiceCenterQuery, [booking.service_center_id], (centerErr, centerResult) => {
          if (centerErr) {
            reject(centerErr);
          } else {
            resolve(centerResult[0]);
          }
        });
      });

      return Promise.all([vehiclePromise, serviceCenterPromise])
        .then(([vehicle, serviceCenter]) => {
          return {
            booking: booking,
            vehicle: vehicle,
            serviceCenter: serviceCenter
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

module.exports = fetchBookings;
