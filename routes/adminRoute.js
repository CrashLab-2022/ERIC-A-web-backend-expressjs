const express = require('express');
const adminController = require('../conrtollers/adminController');
const router = express.Router();

router.get('/list', adminController.getAllDeliveryList);

module.exports = router;
