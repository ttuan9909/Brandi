const express = require ('express');
const {getAlllist, deleteUser, deleteDoctor,createDoctor,getAllDoctors, getAddDoctorForm } = require('../controllers/adminController');
const router = express.Router();


router.get('/', getAlllist);
router.get('/doctors', getAllDoctors);
router.get('/formDoctor', getAddDoctorForm);
router.post('/doctors', createDoctor);
router.post('/doctors/:id', deleteDoctor);

router.post('/:id', deleteUser);

module.exports = router;
