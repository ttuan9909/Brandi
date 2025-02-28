const express = require ('express');

const { getLoginForm, getRegisterForm,getHomepageUser, getDoctorHome,getHomepage} = require('../controllers/homeController.js');


const router = express.Router()
router.get('/', getHomepage);

module.exports = router;