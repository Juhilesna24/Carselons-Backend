const express = require('express');
const router = express.Router();
const userSignUpController = require('../controllers/Users/userSignUp');
const userLoginController = require('../controllers/Users/userLogin');
const addServiceCenterController = require('../controllers/serviceCenter/addServiceCenterDetails');
const getServiceCentersByUserId = require('../controllers/serviceCenter/getServiceCentersByUserId');
const updateStatusController = require('../controllers/serviceCenter/updateServiceStatus');
const getAvailableTimeSlotsController = require('../controllers/Bookings/getAvailableTimeSlots');
const createBookingsController = require('../controllers/Bookings/createBooking');
const addVehicleDetailsController = require('../controllers/Vehicles/addVehicleDetails');
const getVehicleDetailsController = require('../controllers/Vehicles/getVehicleDetails');
const fetchBookingsController = require('../controllers/Bookings/getBookingDetails');
const { signUpValidator, loginValidator, addServiceCenterValidator, updateStatusValidator, createBookingValidator, addVehicleDetailsValidator } = require('../middleware/validator');
const verifyToken = require('../middleware/authMiddleware');


// User signup route
router.post('/signup', signUpValidator, userSignUpController);
router.post('/login', loginValidator, userLoginController);

// Route to get service centers by user ID
router.post('/service-centers', verifyToken, addServiceCenterValidator, addServiceCenterController);
router.get('/service-centers', verifyToken, getServiceCentersByUserId);
router.patch('/service-centers/:id/status', verifyToken, updateStatusValidator, updateStatusController);
router.get('/service-centers/:id/available-time-slots', verifyToken, getAvailableTimeSlotsController);

//Bookings
router.post('/bookings', verifyToken, createBookingValidator, createBookingsController);
router.get('/bookings', verifyToken, fetchBookingsController);

//Vehicles
router.post('/vehicles', verifyToken, addVehicleDetailsValidator, addVehicleDetailsController);
router.get('/vehicles', verifyToken, getVehicleDetailsController);





module.exports = router;
