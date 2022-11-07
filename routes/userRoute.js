const express = require('express');
const userController = require('../conrtollers/userController');
const router = express.Router();

router.post('/signup', userController.signUp);
router.get('/signup/checkPhone/:phoneNumber', userController.checkPhoneNumber);

module.exports = router;
