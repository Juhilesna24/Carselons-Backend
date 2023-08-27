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
const updateVehicleDetailsController = require('../controllers/Vehicles/updateVehicleDetails');
const getServiceDetailsController = require('../controllers/serviceCenter/getServiceDetails');
const getServiceCenterStaticController = require('../controllers/admin/fetchServiceCount');
const getTimeSlotStaticController = require('../controllers/admin/fetchPeakTime');
const { signUpValidator, loginValidator, addServiceCenterValidator, updateStatusValidator, createBookingValidator, vehicleDetailsValidator } = require('../middleware/validator');
const verifyToken = require('../middleware/authMiddleware');


// User signup route
router.post('/signup', signUpValidator, userSignUpController);
router.post('/login', loginValidator, userLoginController);

//Service Center
router.post('/service-centers', verifyToken, addServiceCenterValidator, addServiceCenterController);
router.get('/service-centers', verifyToken, getServiceCentersByUserId);
router.patch('/service-centers/:id/status', verifyToken, updateStatusValidator, updateStatusController);
router.get('/service-centers/:id/available-time-slots', verifyToken, getAvailableTimeSlotsController);
router.get('/service-details/:id', verifyToken, getServiceDetailsController);

//Bookings
router.post('/bookings', verifyToken, createBookingValidator, createBookingsController);
router.get('/bookings', verifyToken, fetchBookingsController);

//Vehicles
router.post('/vehicles', verifyToken, vehicleDetailsValidator, addVehicleDetailsController);
router.get('/vehicles', verifyToken, getVehicleDetailsController);
router.patch('/vehicles/:id', verifyToken, vehicleDetailsValidator, updateVehicleDetailsController);

//Admin
router.get('/admin/static', verifyToken, getServiceCenterStaticController);
router.get('/admin/time-slot-static', verifyToken, getTimeSlotStaticController);






module.exports = router;
