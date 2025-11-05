// Home routes
const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homeController');
const { authenticate } = require('../middleware/auth');

// Protected routes
router.get('/', authenticate, homeController.getHome);

module.exports = router;

