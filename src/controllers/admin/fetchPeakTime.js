const db = require('../../../db'); // Configure and export database connection


const fetchPeakTime = async (req, res) => {
  const userId = req.userId;
  const role = req.role;
  console.log(role, 'role')

  try {
    const fetchStatics = `SELECT time_slot, COUNT(*) AS num_of_time_slot FROM service_bookings GROUP BY time_slot`;
    db.query(fetchStatics, [userId], (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ success: false, message: 'Error fetching service time slots' });
      }
      res.status(200).json({ success: true, result: result });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error fetching service time slots' });
  }
};

module.exports = fetchPeakTime;
