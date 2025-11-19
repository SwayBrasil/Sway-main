const express = require('express');
const router = express.Router();
const { authenticate } = require('../middleware/auth');

// Placeholder - em produção, implementar controller de conversas
router.get('/', authenticate, async (req, res) => {
  try {
    // Por enquanto, retornar array vazio
    res.json({
      success: true,
      data: []
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erro ao buscar conversas'
    });
  }
});

module.exports = router;


