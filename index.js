// server.js
const express = require('express');
const bodyParser = require('body-parser'); // Import the body-parser library
const app = express();


// Use the body-parser middleware
app.use(bodyParser.json()); // To parse JSON-encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // To parse URL-encoded bodies

// Other middleware and setup...
const cors = require('cors');
const corsOptions = {};
app.use(cors({
  origin: '*'
}));
// Include the bookings route
const vehicleRoutes = require('./src/routes/vehicles');
const errorHandler = require('./src/middleware/errorHandler');
app.use('/api', vehicleRoutes);
app.use(errorHandler);


// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
