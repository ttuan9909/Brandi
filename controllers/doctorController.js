const Doctor = require('../models/Doctor');
const Booking = require('../models/Booking.js');

const getAllDoctors1 = async (req, res) => {
    try {
        const doctors = await Doctor.find().populate('userId'); // Populating userId để lấy thông tin người dùng nếu có
        if (!doctors || doctors.length === 0) {
            return res.status(404).render('doctorList', { errorMessage: 'No doctors found.' });
        }
        res.render('doctoruser', { doctors }); // Truyền danh sách bác sĩ vào view
    } catch (error) {
        console.error(error);
        res.status(500).render('doctorList', { errorMessage: 'An error occurred while fetching doctors.' });
    }
};

const getAllBookingsforDoctor = async (req, res) => {
    try {
        // Populate the doctorId field with the doctor's name
        const bookings = await Booking.find().populate("doctorId", "name");
       

        // Render the booked page with the bookings data and flash messages
        res.render("doctorAppoint", {
            bookings,
            
            successMessage: req.flash("success"),
            errorMessage: req.flash("error")
        });
    } catch (error) {
        req.flash("error", "Lỗi khi tải danh sách đặt lịch.");
        res.redirect("/formbooking");
    }
};


// // Lấy thông tin bác sĩ theo ID
// const getBookingByDoctorId = async (req, res) => {
//     try {
//         const { doctorId } = req.params; // Get doctorId from the URL

//         // Find all bookings that belong to this doctor and populate doctor details
//         const bookings = await Booking.find({ doctorId }).populate("doctorId", "name");

//         if (!bookings.length) {
//             return res.status(404).json({ success: false, message: "Không có lịch hẹn nào cho bác sĩ này." });
//         }

//         res.render("doctorAppoint1", {
//             bookings,
            
//             successMessage: req.flash("success"),
//             errorMessage: req.flash("error")
//         });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ success: false, message: "Lỗi khi tải danh sách đặt lịch.", error: error.message });
//     }
// };



module.exports = {getAllBookingsforDoctor, getAllDoctors1};

