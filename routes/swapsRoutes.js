const express = require('express');
const authController = require('../controllers/authController');
const swapsController = require('../controllers/swapsController');

const router = express.Router();
router.use(authController.protect);

router.get('/:status', swapsController.getSwaps);

module.exports = router;
