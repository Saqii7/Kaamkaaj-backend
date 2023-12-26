const express = require('express');
const router = express.Router();
const BookingController = require('../controller/bookingController');
const { authorizeRoles } = require('../controller/authController'); // Import the authorizeRoles function

// Routes for booking-related operations

// Create a new booking
router.post('/create', BookingController.createBooking);

// Get all bookings (only accessible to Super Admin)
router.get('/all', authorizeRoles(['Super Admin']), BookingController.getAllBookings);

module.exports = router;
