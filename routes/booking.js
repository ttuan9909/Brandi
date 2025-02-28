const express = require('express');
const{ getBookingById, createBooking, deleteBooking, getAllBookings, getBookingForm, getBookingsByUserId} =require('../controllers/bookingController');

const router = express.Router();

router.get('/booked/:id', getBookingById);
router.get('/booked/user/:userId', getBookingsByUserId);
router.get('/formbooking', getBookingForm);
// Get all bookings
router.get('/booked', getAllBookings);

// Create a new booking
router.post('/create', createBooking);


// Delete booking
router.delete('/delete/:id', deleteBooking);

module.exports = router;