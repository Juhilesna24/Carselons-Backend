const db = require('../../../db');

const updateStatus = async (req, res) => {
  const serviceCenterId = req.params.service_center_id;
  const { status } = req.body;

  try {
    const updateStatusQuery = 'UPDATE service_centers SET status = ? WHERE id = ?';
    db.query(updateStatusQuery, [status, serviceCenterId], (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: 'Error updating status' });
      }
      res.status(200).json({ message: 'Status updated successfully' });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating status' });
  }
};

module.exports = updateStatus;