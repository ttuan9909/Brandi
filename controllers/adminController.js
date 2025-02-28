const Doctor = require('../models/Doctor');
const User = require('../models/User');  // Ensure this is correctly imported
const bcrypt = require('bcryptjs');



const getAlllist = async (req, res) => {
    try {
        // ✅ Fetch only users (excluding doctors)
        const users = await User.find({ role: { $ne: "doctor" } });

        const doctors = await Doctor.find();

        // ✅ Render the EJS template with users only
        res.render("adminHome", { users, doctors });
        
    } catch (err) {
        console.error("Error fetching users:", err);
        res.status(500).json({
            success: false,
            message: "Error fetching users",
            error: err.message
        });
    }
};
const getAllDoctors = async (req, res) => {
    try {
        
        const users = await User.find({ role: { $ne: "doctor" } });
        const doctors = await Doctor.find().populate('userId', 'username password');

       
        res.render("doctor", { users, doctors });
    } catch (err) {
        console.error("Error fetching users:", err);
        res.status(500).json({
            success: false,
            message: "Error fetching users",
            error: err.message
        });
    }
};

const deleteUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await User.findByIdAndDelete(userId);

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        res.render("adminHome", { user, message: "User deleted successfully" });
    } catch (err) {
        res.status(500).json({ success: false, message: "Error deleting user", error: err.message });
    }
};


const createDoctor = async (req, res) => {
    try {
        const { username, password, name, email, address, experience, description, price } = req.body;

        // 1️⃣ Kiểm tra nếu username hoặc email đã tồn tại
        const existingUser = await User.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            return res.status(400).json({ success: false, message: "Username or email already exists" });
        }

        // 2️⃣ Hash password trước khi lưu
        const hashedPassword = await bcrypt.hash(password, 10);

        // 3️⃣ Tạo user mới với role "doctor"
        const newUser = new User({
            username,
            password: hashedPassword,
            role: "doctor",
            name,
            email
        });
        await newUser.save();

        // 4️⃣ Tạo doctor và liên kết với userId
        const newDoctor = new Doctor({
            userId: newUser._id,
            name,
            email,
            address,
            experience,
            description,
            price
        });
        await newDoctor.save();

        res.redirect(`/admin/doctors`)
    } catch (err) {
        console.error("Error creating doctor:", err);
        res.status(500).json({ success: false, message: "Error creating doctor", error: err.message });
    }
};

const getAddDoctorForm = async (req, res) => {
    try {
         // Lấy danh sách bác sĩ từ MongoDB
        res.render("createDoctor"); // Truyền danh sách bác sĩ sang view booking.ejs
    } catch (error) {
        console.error("Lỗi ", error);
        res.status(500).send("Lỗi server");
    }
};


const deleteDoctor = async (req, res) => {
    try {
        const doctorId = req.params.id;
        await Doctor.findByIdAndDelete(doctorId);

        return res.redirect("/admin/doctors"); // ✅ Thêm return để dừng function
    } catch (err) {
        console.error("Error deleting doctor:", err);

        if (!res.headersSent) { // ✅ Kiểm tra nếu header chưa gửi thì mới gửi JSON
            return res.status(500).json({ success: false, message: "Error deleting doctor", error: err.message });
        }
    }
};

module.exports = { getAlllist, createDoctor,deleteUser, deleteDoctor,getAllDoctors, getAddDoctorForm};
