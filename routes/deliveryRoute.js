const express = require('express');
const deliveryController = require('../controllers/deliveryController');
const router = express.Router();

router.post('/order', deliveryController.orderDelivery);
router.get('/list/:phoneNumber', deliveryController.getDeliveryList);

module.exports = router;
