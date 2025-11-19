// Authentication routes
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const socialAuthController = require('../controllers/socialAuthController');
const { authenticate } = require('../middleware/auth');

// Public routes (mas requerem tenant/subdomínio)
router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/forgot-password', authController.forgotPassword);
router.post('/reset-password', authController.resetPassword);

// Protected routes (antes das rotas dinâmicas)
router.get('/me', authenticate, authController.getMe);
router.put('/profile', authenticate, authController.updateProfile);
router.put('/change-password', authenticate, authController.changePassword);

// Social authentication routes (depois das rotas específicas)
router.get('/:provider', socialAuthController.initiateOAuth);
router.get('/callback/:provider', socialAuthController.handleOAuthCallback);

module.exports = router;

