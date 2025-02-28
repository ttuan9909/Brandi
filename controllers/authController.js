const bcrypt = require('bcryptjs');
const User = require('../models/User');  // Ensure this is correctly imported
const jwt = require('jsonwebtoken');
const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        
        // Find the user with the provided username
        const user = await User.findOne({ username });
        console.log(user._id);
        
        if (!user) {
            req.flash("error", "User Not Found");
            return res.redirect("/auth/formlogin");
        }

        // Check if the password matches
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            req.flash("error", "Wrong password!");
            return res.redirect("/auth/formlogin");
        }

        req.flash("success", "Login successful! Welcome back.");

        

        // Generate JWT token based on the user and account role
        const token = jwt.sign(
            { _id: user._id, role: user.role },
            process.env.JWT_KEY,
            { expiresIn: "10d" }
        );

        req.session.token = token;
        req.session.user = user;

        // Redirect based on the user role
        switch (user.role) {
            case "admin":
                return res.redirect("/admin");  // Admin dashboard
            case "doctor":
                return res.redirect("/");  // Doctor's dashboard
            case "user":
                return res.redirect("/");  // User's dashboard
            default:
                return res.redirect("/auth/formlogin");
        }

    } catch (error) {
        req.flash("error", "An error occurred!");
        res.redirect("/auth/formlogin");
    }
}

const verify = (req, res) => {
    return res.status(200).json({ success: true, user: req.user });
}

// const register = async (req, res) => {
//     try {
//         const { username, email, password, role } = req.body;

//         // Check if username already exists
//         const existingUser = await User.findOne({ username });
//         if (existingUser) {
//             req.flash("error", "Username already exists!");
//             return res.redirect("/formregister");
//         }

//         // Hash password
//         const hashedPassword = await bcrypt.hash(password, 10);

//         // Determine role (default to "user" if not provided or invalid)
//         const userRole = role === "admin" || role === "doctor" ? role : "user";

//         // Create new user
//         const newUser = new User({
//             name: username,
//             email,  // keep email in case it's needed for other features
//             password: hashedPassword,
//             role: userRole
//         });

//         // Save user to database
//         await newUser.save();

//         // Create an account for the new user with the specified role
//         const newAccount = new Account({
//             username,
//             password: hashedPassword,
//             role: userRole,
//             user: newUser._id,
//             doctor: userRole === "doctor" ? newUser._id : null  // Link doctor if role is doctor
//         });

//         // Save account to database
//         await newAccount.save();

//         // Check if JWT_KEY is set in environment
//         if (!process.env.JWT_KEY) {
//             return res.status(500).json({ success: false, error: "Missing JWT_KEY in server configuration" });
//         }

//         // Generate JWT token
//         const token = jwt.sign(
//             { _id: newUser._id, role: newAccount.role },
//             process.env.JWT_KEY,
//             { expiresIn: "10d" }
//         );

//         req.flash("success", "Registration successful! Please log in.");
//         res.redirect("/formlogin");

//     } catch (error) {
//         console.error("Register Error:", error.message);
//         req.flash("error", "An error occurred during registration.");
//         res.redirect("/formregister");
//     }
// };
const register = async (req, res) => {
    try {
        const {  username, password, email, name } = req.body;
        console.log(req.body);

        // Check if username is provided
        if (!username || username.trim() === "") {
            req.flash("error", "Username is required!");
            return res.redirect("/auth/formregister");
        }

        // Check if email is provided
        if (!email || email.trim() === "") {
            req.flash("error", "Email is required!");
            return res.redirect("/auth/formregister");
        }

        // Check if password is provided
        if (!password || password.trim() === "") {
            req.flash("error", "Password is required!");
            return res.redirect("/auth/formregister");
        }

        // Check if email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            req.flash("error", "Email already exists!");
            return res.redirect("/auth/formregister");
        }

        // Check if username already exists
        const existingUsername = await User.findOne({ username });
        if (existingUsername) {
            req.flash("error", "Username already exists!");
            return res.redirect("/auth/formregister");
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);


        // Create new user
        const newUser = new User({
            username,
            password: hashedPassword,
            name,
            email,  // keep email in case it's needed for other features
         
        });

        // Save user to database
        await newUser.save();

        

        // Check if JWT_KEY is set in environment
        if (!process.env.JWT_KEY) {
            return res.status(500).json({ success: false, error: "Missing JWT_KEY in server configuration" });
        }

        // Generate JWT token
        const token = jwt.sign(
            { _id: newUser._id, role: newUser.role },
            process.env.JWT_KEY,
            { expiresIn: "10d" }
        );

        // Store token in session (if needed)
        req.session.token = token;

        req.flash("success", "Registration successful! Please log in.");
        res.redirect("/auth/formlogin");

    } catch (error) {
        console.error("Register Error:", error.message);
        req.flash("error", "An error occurred during registration.");
        res.redirect("/auth/formregister");
    }
};

const logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error("Error logging out:", err);
            return res.status(500).json({ success: false, message: "Logout failed" });
        }
        res.redirect('/auth/formlogin'); // Redirect to login page after logout
    });
};


module.exports = { login, register, verify, logout };
