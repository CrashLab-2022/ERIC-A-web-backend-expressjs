const express = require('express');
const controlController = require('../controllers/controlController');
const router = express.Router();

router.get('/opendoor', controlController.openDoor);
router.get('/closedoor', controlController.openDoor);
router.get('/test', controlController.test);

module.exports = router;
