const db = require('../../../db'); // Configure and export database connection


const getServiceCentersByUserId = async (req, res) => {
  const userId = req.userId;

  try {
    const fetchServiceCentersQuery = 'SELECT * FROM service_centers WHERE user_id = ?';
    db.query(fetchServiceCentersQuery, [userId], (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: 'Error fetching service centers' });
      }
      res.status(200).json(result);
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching service centers' });
  }
};

module.exports = getServiceCentersByUserId;
