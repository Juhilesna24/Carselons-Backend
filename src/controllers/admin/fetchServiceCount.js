const db = require('../../../db'); // Configure and export database connection


const getServiceCenterStatic = async (req, res) => {
  const userId = req.userId;
  const role = req.role;
  console.log(role, 'role')

  try {
    const fetchStatics = `SELECT sc.id AS service_center_id, sc.name AS service_center_name, COALESCE(sb.num_of_services_booked, 0) AS num_of_services_booked
    FROM service_centers sc
    LEFT JOIN (
        SELECT service_center_id, COUNT(*) AS num_of_services_booked
        FROM service_bookings
        GROUP BY service_center_id
    ) sb ON sc.id = sb.service_center_id;
    `;
    db.query(fetchStatics, [userId], (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ success: false, message: 'Error fetching service centers' });
      }
      res.status(200).json({ success: true, result: result });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error fetching service centers' });
  }
};

module.exports = getServiceCenterStatic;
