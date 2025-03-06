const express = require("express");
const surveyController = require("../controllers/surveyController");



const router = express.Router();


// Route to get all meetings
router.post("/", surveyController.submitSurvey);
// router.get("/:meetingId", getMeetingsPage);


module.exports = router;