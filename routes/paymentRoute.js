var express = require('express');
const paymentController = require('../controllers/paymentController');
var router = express.Router();

router.get('/', paymentController.pay);
router.get('/success', paymentController.success);
router.get('/fail', paymentController.fail);

module.exports = router;
