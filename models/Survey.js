const mongoose = require('mongoose');

const surveySchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    age: { type: Number, required: true },
    stress_level: { type: String, required: true },
    sleep_problem: { type: String, required: true },
    depression: { type: String, required: true },
    meals_per_day: { type: String, required: true },
    water_intake: { type: String, required: true },
    vegetable_fruit: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Survey', surveySchema);
