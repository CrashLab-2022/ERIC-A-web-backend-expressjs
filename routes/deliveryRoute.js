const express = require('express');
const deliveryController = require('../conrtollers/deliveryController');
const router = express.Router();

router.post('/order', deliveryController.orderDelivery);
router.get('/list/:phoneNumber', deliveryController.getDeliveryList);
router.get('/control/opendoor', deliveryController.openDoor);
router.get('/control/closedoor', deliveryController.openDoor);

module.exports = router;
