const express = require('express');
const deliveryController = require('../conrtollers/deliveryController');
const router = express.Router();

router.post('/order', deliveryController.orderDelivery);

module.exports = router;
