const db = require('../../../db');

const addServiceCenter = async (req, res) => {
  const { name, location, availableServices, workingHours } = req.body;
  const userId = req.userId; 

  try {
    // Check if a service center with the same name or location already exists
    const checkDuplicateQuery = 'SELECT * FROM service_centers WHERE name = ?';
    db.query(checkDuplicateQuery, [name, location], (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: 'Error adding service center' });
      }
      if (results.length > 0) {
        return res.status(400).json({ message: 'Service center with the same name' });
      }

      // Insert service center details into the database
      const insertServiceCenterQuery = 'INSERT INTO service_centers (user_id, name, location, available_services, working_hours, status) VALUES (?, ?, ?, ?, ?, ?)';
      const availableServicesString = JSON.stringify(availableServices); // Convert array to string
      const workingHoursString = JSON.stringify(workingHours);
      db.query(insertServiceCenterQuery, [userId, name, location, availableServicesString, workingHoursString, 'pending'], (err, result) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ message: 'Error adding service center' });
        }
        res.status(201).json({ message: 'Service center added successfully' });
      });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error adding service center' });
  }
};

module.exports = addServiceCenter;
