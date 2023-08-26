const db = require('../../../db');
const transporter  = require('../../utils/mailer');

const createBooking = async (req, res) => {
  const { date, timeSlot, serviceType, serviceCenterId, vehicle_id } = req.body;
  const userId = req.userId; // Extracted from token verification
  const email = req.email;

  try {
    // Insert booking details into the database
    const insertBookingQuery = 'INSERT INTO service_bookings (user_id, date, time_slot, service_type, service_center_id, vehicle_id) VALUES (?, ?, ?, ?, ?, ?)';
    db.query(insertBookingQuery, [userId, date, timeSlot, serviceType, serviceCenterId, vehicle_id], (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ success: false, message: 'Error creating booking' });
      }

      // Send an email to the user
      const mailOptions = {
        from: 'jlesna66@gmail.com',
        to: email, // Replace with the user's email address
        subject: 'Booking Confirmation',
        text: 'Your booking has been successfully created.'
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });

      res.status(201).json({ success: true, message: 'Booking created successfully' });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error creating booking' });
  }
};

module.exports = createBooking;
