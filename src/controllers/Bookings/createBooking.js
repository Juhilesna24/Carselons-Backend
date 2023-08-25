const mysql = require('mysql2');
const db = require('../../../db'); // Configure and export database connection

const createBooking = async (req, res) => {
  const { date, timeSlot, serviceType, serviceCenterId, vehicle_id } = req.body;
  const userId = req.userId; // Extracted from token verification

  try {
    // Insert booking details into the database
    const insertBookingQuery = 'INSERT INTO service_bookings (user_id, date, time_slot, service_type, service_center_id, vehicle_id) VALUES (?, ?, ?, ?, ?, ?)';
    db.query(insertBookingQuery, [userId, date, timeSlot, serviceType, serviceCenterId, vehicle_id], (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: 'Error creating booking' });
      }
      res.status(201).json({ message: 'Booking created successfully' });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating booking' });
  }
};

module.exports = createBooking;
