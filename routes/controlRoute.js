const express = require('express');
const controlController = require('../controllers/controlController');
const router = express.Router();

router.get('/opendoor', controlController.openDoor);
router.get('/closedoor', controlController.openDoor);

module.exports = router;
