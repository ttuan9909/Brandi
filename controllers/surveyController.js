const Survey = require('../models/Survey');

const submitSurvey = async (req, res) => {
    try {
        const { name, email, age, stress_level, sleep_problem, depression, meals_per_day, water_intake, vegetable_fruit } = req.body;

        // Tạo khảo sát mới
        const newSurvey = new Survey({
            name, email, age, stress_level, sleep_problem, depression, meals_per_day, water_intake, vegetable_fruit
        });

        await newSurvey.save();
        res.status(201).json({ message: 'Khảo sát đã được gửi thành công!' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Lỗi server', error: error.message });
    }
};
module.exports = {submitSurvey}
