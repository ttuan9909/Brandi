// const mongoose = require('mongoose');
// const Doctor = require('./Doctor');

// const BookingSchema = new mongoose.Schema({
  
    // userId: { 
    //     type: mongoose.Schema.Types.ObjectId, 
    //     ref: "User", 
    //     required: true 
    // },
// doctorId:    { type: mongoose.Schema.Types.ObjectId, ref: "Doctor", required: true },
// doctor:{ type: mongoose.Schema.Types.ObjectId, ref: "Doctor", required: true },
// patientName: {
//     type: String,
//     required: true
// },
// phone: {
//     type: String,
//     required: true
// },
// email: {
//     type: String,
//     required: true
// },
// appointmentDate: {
//     type: Date,
//     required: true
// },
// time: {
//     type: String,
//     required: true
// },
// note: {
//     type: String
// },
// createdAt: {
//     type: Date,
//     default: Date.now
// }
// });

const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
    doctorId: { type: mongoose.Schema.Types.ObjectId, ref: "Doctor", required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

    patientName: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    appointmentDate: { type: Date, required: true },
    time: { type: String, required: true },
    note: { type: String, default: "" }
});
// Auto-populate doctor and user objects
bookingSchema.virtual("doctor", {
    ref: "Doctor",
    localField: "doctorId",
    foreignField: "_id",
    justOne: true
  });
  
  bookingSchema.virtual("user", {
    ref: "User",
    localField: "userId",
    foreignField: "_id",
    justOne: true
  });
  
const Booking = mongoose.model("Booking", bookingSchema);

module.exports = Booking;
