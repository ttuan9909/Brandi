const express = require('express');
const { getAllBookingsforDoctor,getBookingByDoctorId, getAllDoctors1 } =require('../controllers/doctorController');
const router = express.Router();

// Get all rooms
router.get('/',  getAllBookingsforDoctor);
// router.get('/:id',  getBookingByDoctorId);
router.get('/doctoruser',  getAllDoctors1);





module.exports= router;