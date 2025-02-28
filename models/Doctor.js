const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
    userId: { 
                type: mongoose.Schema.Types.ObjectId, 
                ref: "User", 
                sparse: true, 
                unique: true // Đảm bảo mỗi user chỉ có một account
            },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    address: { type: String },
    experience: { type: String },
    description: { type: String },
    price: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
},{timestamps:true});


const Doctor = mongoose.model('Doctor', doctorSchema);

module.exports = Doctor;
