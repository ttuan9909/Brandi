const express = require("express");
const { getMeetings } = require("../controllers/meetingController");
const { model } = require("mongoose");


const router = express.Router();

router.get("/config", (req, res) => {
  res.json({ serverUrl: "http://localhost:3000" });
});

// Route to get all meetings
router.get("/meetings", getMeetings);
// router.get("/:meetingId", getMeetingsPage);


module.exports = router;
