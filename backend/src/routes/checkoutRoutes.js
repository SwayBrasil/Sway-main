const express = require('express');
const router = express.Router();
const checkoutController = require('../controllers/checkoutController');
const { authenticate } = require('../middleware/auth');

// Obter informações do plano (público)
router.get('/plan/:planName', checkoutController.getPlan);

// Criar pedido (requer autenticação)
router.post('/order', authenticate, checkoutController.createOrder);

// Obter pedido (requer autenticação)
router.get('/order/:orderId', authenticate, checkoutController.getOrder);

// Confirmar pagamento (webhook - pode ser público com validação de assinatura)
router.post('/payment/confirm', checkoutController.confirmPayment);

module.exports = router;

