const express = require('express');
const controlController = require('../controllers/controlController');
const router = express.Router();

router.get('/test', controlController.test);
router.get('/useropen', controlController.userOpen);
router.get('/adminopen', controlController.adminOpen);
router.get('/adminclose', controlController.adminClose);
router.get('/adminstart/:id', controlController.adminStart);
router.post('/accept/:id', controlController.acceptDelivery);
router.post('/refuse/:id', controlController.refuseDelivery);

module.exports = router;
