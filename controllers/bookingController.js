const Booking = require('../models/Booking.js');
const Doctor = require('../models/Doctor.js');
const mongoose = require("mongoose");
const User = require('../models/User');  // Ensure this is correctly imported

// Tạo lịch hẹn với bác sĩ


const createBooking = async (req, res) => {
    try {
        const { patientName, doctorId, phone, email, appointmentDate, time, note } = req.body;
        const user = req.session.user;
        if (!patientName || !doctorId || !phone || !email || !appointmentDate || !time) {
            return res.status(400).json({ success: false, message: "Thiếu thông tin bắt buộc" });
        }

        // Kiểm tra xem bác sĩ có tồn tại không
        const doctor = await Doctor.findById(doctorId);
        if (!doctor) {
            return res.status(404).json({ success: false, message: "Không tìm thấy bác sĩ" });
        }

        // Tạo booking mới
        const newBooking = new Booking({
            doctorId,
            userId:user._id,
            patientName,
            phone,
            email,
            appointmentDate,
            time,
            note
        });

        await newBooking.save();

        res.redirect(`/booking/booked/user/${user._id}`)
        
    } catch (error) {
        res.status(500).json({ success: false, message: "Lỗi khi tạo lịch hẹn", error: error.message });
    }
};

// Lấy danh sách lịch hẹn
const getAllBookings = async (req, res) => {
    try {
        // Populate the doctorId field with the doctor's name
        const bookings = await Booking.find().populate("doctorId", "name");

        // Render the booked page with the bookings data and flash messages
        res.render("booked", {
            bookings,
            successMessage: req.flash("success"),
            errorMessage: req.flash("error")
        });
    } catch (error) {
        req.flash("error", "Lỗi khi tải danh sách đặt lịch.");
        res.redirect("/formbooking");
    }
};


// Lấy lịch hẹn theo ID
const getBookingById = async (req, res) => {
    try {
        const { bookingId } = req.params;

        // Kiểm tra xem bookingId có phải ObjectId hợp lệ không
        if (!mongoose.Types.ObjectId.isValid(bookingId)) {
            return res.status(400).json({ success: false, message: "Invalid booking ID" });
        }
        const doctors = await Doctor.find(); // Lấy danh sách bác sĩ từ MongoDB
        res.render("booking", { doctors });

        // Tìm booking theo ID và populate thông tin user và doctor
        const booking = await Booking.findById(bookingId)
            .populate("userId", "username email")
            .populate("doctorId", "username email");

        if (!booking) {
            return res.status(404).json({ success: false, message: "Booking not found" });
        }

        res.status(200).json({ success: true, data: booking });
    } catch (error) {
        console.error("Error fetching booking:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

const getBookingsByUserId = async (req, res) => {
    try {
        const { userId } = req.params;
         // Lấy userId từ URL params
        const user = await User.findById(userId)
        console.log(user);
    
        // Kiểm tra xem userId có hợp lệ không
        if (!user) {
            return res.status(400).json({ success: false, message: "Invalid user ID" });
        }

        // Lấy danh sách bác sĩ (nếu cần hiển thị danh sách trong view)
        const doctors = await Doctor.find();

        // Tìm tất cả các booking của user đó và populate thông tin doctor
        const bookings = await Booking.find({ userId })
            .populate("doctorId", "name");

        if (!bookings.length) {
            console.log("No bookings found for this user");
            
        }

        // Nếu API dùng để hiển thị trang đặt lịch
        return res.render("booked", { doctors, bookings });

        // Nếu API chỉ trả về JSON
        // res.status(200).json({ success: true, data: bookings });

    } catch (error) {
        console.error("Error fetching bookings:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

// Xóa lịch hẹn
const deleteBooking = async (req, res) => {
    try {
        const deletedBooking = await Booking.findByIdAndDelete(req.params.id);
        if (!deletedBooking) {
            return res.status(404).json({ success: false, message: "Booking not found" });
        }
        res.status(200).json({ success: true, message: "Booking deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error deleting booking", error: error.message });
    }
};

const getBookingForm = async (req, res) => {
    try {
        const doctors = await Doctor.find(); // Lấy danh sách bác sĩ từ MongoDB
        res.render("booking", { doctors }); // Truyền danh sách bác sĩ sang view booking.ejs
    } catch (error) {
        console.error("Lỗi lấy danh sách bác sĩ:", error);
        res.status(500).send("Lỗi server");
    }
};


module.exports= { createBooking, deleteBooking, getAllBookings, getBookingById, getBookingForm, getBookingsByUserId};
