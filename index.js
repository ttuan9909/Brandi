require('dotenv').config();
const User = require("./models/User"); // Import User model

const express = require('express');
const path = require('path');
const connectToDatabase = require('./config/db');
const http = require('http');
const { Server } = require("socket.io");
const { handleSocketEvents } = require('./controllers/meetingController');
const authRoutes = require('./routes/auth');
const bookingRoutes = require('./routes/booking');
const doctorRoutes = require('./routes/doctor');
const adminRoutes = require('./routes/admin');
const homeRoutes = require('./routes/home');
const meetingRoutes = require('./routes/meeting');
const cors = require('cors');

const app = express();
const session = require("express-session");
const flash = require("connect-flash");

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

app.use(express.static('public'));

const users = {}; // Ensure users object is defined



io.on('connection', (socket) => {
    console.log(`User connected: ${socket.id}`);

    socket.on('create-meeting', async (_, callback) => {
        try {
            const apiKey = process.env.DAILY_API_KEY;
            if (!apiKey) {
                throw new Error('Missing DAILY_API_KEY in environment variables');
            }
            const fetch = (await import('node-fetch')).default;
            const response = await fetch('https://api.daily.co/v1/rooms', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${apiKey}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: `meeting-${Date.now()}`,
                    privacy: 'public',
                }),
            });

            if (!response.ok) {
                throw new Error(`Daily.co API Error: ${response.statusText}`);
            }

            const data = await response.json();
            if (!data || !data.url) {
                throw new Error('Invalid response from Daily.co API');
            }

            const meetingId = data.url.split('/').pop();
            const meetingData = { meetingId, meetingUrl: data.url };

            users[socket.id] = meetingData; // Store meeting data per user

            io.emit('meeting-created', meetingData); // Notify all clients
            callback(meetingData);
        } catch (error) {
            console.error('Error creating meeting:', error.message);
            socket.emit('error', { message: `Failed to create meeting: ${error.message}` });
        }
    });

    // Handle user joining a meeting
    socket.on("join-meeting", (meetingId) => {
        socket.join(meetingId);
        console.log(`User ${socket.id} joined meeting: ${meetingId}`);
        io.to(meetingId).emit("user-joined", { userId: socket.id });
    });

    socket.on("disconnect", () => {
        console.log(`User disconnected: ${socket.id}`);
        delete users[socket.id]; // Remove user from active users
    });
});


handleSocketEvents(io);

app.use(cors());
connectToDatabase();

const port = process.env.PORT || 8888;
app.set('views', path.join('views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret: process.env.JWT_KEY || "d4101f2a8740b4fd583cf133e66150feed916f6e56abaa8e92552956ba14e69bd90a01465c6f64f16ae32ab17c3ecbeb7e7b535660de57d28ee45db5103d323f",
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Set to true in production with HTTPS
}));

app.use(flash());
app.use((req, res, next) => {
  res.locals.user = req.session.user || null; // Store user session globally

  res.locals.successMessage = req.flash("success");
  res.locals.errorMessage = req.flash("error");
  next();
});
app.use('/', homeRoutes);

app.use('/auth', authRoutes);
app.use('/admin', adminRoutes);
app.use('/booking', bookingRoutes);
app.use('/doctor', doctorRoutes);
app.use('/meeting', meetingRoutes);

server.listen(port, '0.0.0.0', () => {
  console.log(`Example app listening on port localhost:${port}`);
});
