const express = require('express');
const controlController = require('../controllers/controlController');
const router = express.Router();

router.get('/opendoor/:id', controlController.open);
router.get('/test', controlController.test);

module.exports = router;
