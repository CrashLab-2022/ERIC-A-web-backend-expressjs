const express = require('express');
const adminController = require('../controllers/adminController');
const router = express.Router();

router.get('/list', adminController.getAllDeliveryList);
router.post('/signin', adminController.signIn);
router.post('/accept/:id', adminController.acceptDelivery);
router.post('/refuse/:id', adminController.refuseDelivery);

module.exports = router;
