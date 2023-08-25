const db = require('../../../db');
const calculateAvailableTimeSlots = require('./calculateAvailableTimeSlots'); // Import the function


const getAvailableTimeSlots = async (req, res) => {
  const serviceCenterId = req.params.id;
  const selectedDate = req.query.date; // Assuming the date is passed as a query parameter

  try {
    // Fetch service center working hours and other necessary details
    const fetchServiceCenterQuery = 'SELECT working_hours FROM service_centers WHERE id = ?';
    db.query(fetchServiceCenterQuery, [serviceCenterId], (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: 'Error fetching service center details' });
      }

      if (result.length === 0) {
        return res.status(404).json({ message: 'Service center not found' });
      }

      const workingHours = result[0].working_hours;
      // Calculate available time slots based on working hours and selected date

      const availableTimeSlots = calculateAvailableTimeSlots(workingHours, selectedDate);
      const utcDate = new Date(selectedDate).toISOString().split('T')[0];
      console.log(utcDate, 'utc')
      console.log(serviceCenterId, 'se')
      const fetchBookedTimeSlotsQuery = 'SELECT time_slot FROM service_bookings WHERE service_center_id = ? AND date = ?';
      db.query(fetchBookedTimeSlotsQuery, [serviceCenterId, utcDate], (err, results) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ message: 'Error fetching booked time slots' });
        }

        console.log(fetchBookedTimeSlotsQuery, 'timeslotes')

        console.log(results, 'res')
        const bookedTimeSlots = results.map(result => result.time_slot);
        console.log(bookedTimeSlots, 'bokmeedd')
        // Filter out booked time slots from available time slots
        const availableTimeSlotsAfterBookings = availableTimeSlots.filter(slot => !bookedTimeSlots.includes(slot));

        // Send the available time slots to the client

        res.status(200).json({ availableTimeSlotsAfterBookings });
      });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching available time slots' });
  }
};

module.exports = getAvailableTimeSlots;