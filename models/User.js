const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['admin', 'user', 'doctor'], default:"user" },
    name: { type: String, required: true },
    email: { type: String, required: true },
    profileImage: { type: String }
},{timestamps: true});

const User = mongoose.model('User', userSchema);

module.exports = User;
