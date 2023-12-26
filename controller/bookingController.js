const Booking = require('../models/bookingSchema');
const { authorizeRoles } = require('./authController');

// Controller functions for booking-related operations

// Create a new booking
async function createBooking(req, res) {
  const { userId, vendorId, serviceType, bookingDate } = req.body;

  try {
    const newBooking = await Booking.create({
      user: userId,
      vendor: vendorId,
      serviceType,
      bookingDate,
    });

    res.status(201).json(newBooking);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Get all bookings (only accessible to Super Admin)
const getAllBookings = authorizeRoles(['Super Admin'], async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


module.exports = {
  createBooking,
  getAllBookings,
};
