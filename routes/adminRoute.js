const express = require('express');
const adminController = require('../controllers/adminController');
const router = express.Router();

router.get('/list', adminController.getAllDeliveryList);
router.post('/signin', adminController.signIn);
router.post('/signup', adminController.signUp);
router.get('/checklogin', adminController.checkLogin);
router.get('/session', adminController.getSession);

module.exports = router;
