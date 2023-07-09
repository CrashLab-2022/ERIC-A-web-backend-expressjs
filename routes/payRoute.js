var express = require('express');
const payController = require('../controllers/payController');
var router = express.Router();

router.get('/', payController.pay);
router.get('/success', payController.success);
router.get('/fail', payController.fail);

module.exports = router;
