const db = require('../../../db'); // Configure and export database connection


const getServiceCentersByUserId = async (req, res) => {
  const userId = req.userId;
  const role = req.role;
  console.log(role, 'role')

  try {
    const fetchServiceCentersQuery = role == 'user' ? 'SELECT * FROM service_centers' : 'SELECT * FROM service_centers WHERE user_id = ? ORDER BY id DESC LIMIT 1';
    db.query(fetchServiceCentersQuery, [userId], (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: 'Error fetching service centers' });
      }
      const data = role === 'user' ? result : result[0];
      res.status(200).json(data);
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching service centers' });
  }
};

module.exports = getServiceCentersByUserId;
