const express = require('express');
const adminController = require('../controllers/adminController');
const router = express.Router();

const checkAdmin = require('../middleware/checkAdmin');

router.get('/list', checkAdmin, adminController.getAllDeliveryList);
router.post('/signin', adminController.signIn);
router.post('/signup', adminController.signUp);
router.get('/checklogin', adminController.checkLogin);
router.get('/session', adminController.getSession);

module.exports = router;
