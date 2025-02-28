const jwt = require('jsonwebtoken');
const User = require('../models/User');

const verifyUser = async (req, res, next) => {
    try {
        // Extract token from the Authorization header
        const token = req.headers.authorization && req.headers.authorization.startsWith('Bearer ') ? 
                      req.headers.authorization.split(' ')[1] : null;

        if (!token) {
            return res.status(400).json({ success: false, error: "Token not provided" });
        }

        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_KEY);

        // If token is invalid or expired, the verification will fail
        if (!decoded || !decoded._id) {
            return res.status(401).json({ success: false, error: "Token not valid or expired" });
        }

        // Find the user by decoded._id and exclude the password field
        const user = await User.findById(decoded._id).select('-password');

        // If user not found, return an error
        if (!user) {
            return res.status(404).json({ success: false, error: "User not found" });
        }

        // Attach the user to the request object to make it accessible in the next middleware or route handler
        req.user = user;

        // Proceed to the next middleware or route handler
        next();
    } catch (error) {
        // Catch any errors during token verification or user retrieval
        console.error(error);
        return res.status(500).json({ success: false, error: "Server error" });
    }
};

module.exports = verifyUser;
