let meetings = []; // Store meetings (for demo purposes)

 const handleSocketEvents = (io) => {
  io.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`);

    // Handle token request
    socket.on("get-token", (data, callback) => {
      const token = "secure_generated_token"; // Replace with real token logic
      callback({ token });
    });

    // Handle meeting creation
    socket.on("create-meeting", (data, callback) => {
      const meetingId = `meeting_${Date.now()}`;
      const meetingUrl = `http://localhost:3000/meeting/${meetingId}`;

      meetings.push({ meetingId, meetingUrl });

      console.log("Meeting created:", meetingId);
      callback({ meetingId, meetingUrl });

      // Emit event to notify client
      io.emit("meeting-created", { meetingId, meetingUrl });
    });

    socket.on("disconnect", () => {
      console.log(`User disconnected: ${socket.id}`);
    });
  });
};

// Function to get all meetings
 const getMeetings = (req, res) => {
    res.render("meeting");
};

// const getMeetingsPage = (req, res) => {
//     const { meetingId } = req.params;
//     res.render("meeting", { meetingId });
//   };

// const getmeet = (req, res) => {
//     res.render("meeting");
//   };

module.exports = {getMeetings, handleSocketEvents};
