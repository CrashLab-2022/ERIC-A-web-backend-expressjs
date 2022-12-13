const express = require('express');
const controlController = require('../controllers/controlController');
const router = express.Router();

router.get('/useropen', controlController.userOpen);
router.get('/adminopen', controlController.adminOpen);
router.get('/adminclose', controlController.adminClose);
router.get('/adminstart', controlController.adminStart);

module.exports = router;
