const { body } = require('express-validator');
const validationResult = require('./index');

const signUpValidator = [
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Invalid email').normalizeEmail(),
  body('mobileNumber').isMobilePhone().withMessage('Invalid mobile number'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  body('role').isIn(['user', 'service_center', 'admin']).withMessage('Invalid role'),
  validationResult
];

const loginValidator = [
  body('email').isEmail().withMessage('Invalid email').normalizeEmail(),
  body('password').notEmpty().withMessage('Password is required'),
  validationResult
];

const addServiceCenterValidator = [
  body('name').notEmpty().withMessage('Name is required'),
  body('location').notEmpty().withMessage('Location is required'),
  body('availableServices').isArray({ min: 1 }).withMessage('At least one available service is required'),
  body('workingHours').isObject().withMessage('Working hours must be an object'),
  validationResult
];

const updateStatusValidator = [
  body('status').isIn(['pending', 'inprogress', 'completed']).withMessage('Invalid status'),
  validationResult
];

const createBookingValidator = [
  body('date').notEmpty().isDate().withMessage('Invalid date format'),
  body('timeSlot').notEmpty().withMessage('Time slot is required'),
  body('serviceType').notEmpty().withMessage('Service type is required'),
  body('serviceCenterId').notEmpty().isInt().withMessage('Invalid service center ID'),
  body('vehicle_id').notEmpty().isInt().withMessage('Invalid Vehicle ID'),
  validationResult
];

const addVehicleDetailsValidator = [
  body('make').notEmpty().withMessage('Make is required'),
  body('model').notEmpty().withMessage('Model is required'),
  body('year').isInt({ min: 1900, max: new Date().getFullYear() }).withMessage('Invalid year'),
  body('mileage').isInt({ min: 0 }).withMessage('Invalid mileage'),
  validationResult
];


module.exports = {
  signUpValidator,
  loginValidator,
  addServiceCenterValidator,
  updateStatusValidator,
  createBookingValidator,
  addVehicleDetailsValidator
};