const express = require('express');
const deliveryController = require('../controllers/deliveryController');
const router = express.Router();

const checkUser = require('../middleware/checkUser');

router.post('/order', checkUser, deliveryController.orderDelivery);
router.get('/list/:phoneNumber', deliveryController.getDeliveryList);

module.exports = router;
