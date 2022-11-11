const express = require('express');
const userController = require('../conrtollers/userController');
const router = express.Router();

router.post('/signup', userController.signUp);
router.post('/signin', userController.signIn);
router.get('/signup/checkphone/:phoneNumber', userController.checkPhoneNumber);
router.get('/checklogin', userController.checkLogin);

module.exports = router;
