const express = require ('express');
const { login, register, verify,logout } = require('../controllers/authController.js');
const { getLoginForm, getRegisterForm,getHomepageUser, getDoctorHome} = require('../controllers/homeController.js');
const authMiddleware = require('../middleware/authMiddleware.js');



const router = express.Router()

router.post('/login', login)
router.post('/verify', authMiddleware, verify)
router.post('/register', register)

router.get('/formregister', getRegisterForm)
router.get('/formlogin', getLoginForm)
router.get('/doctor', getDoctorHome);
router.get('/logout', logout);


module.exports = router;