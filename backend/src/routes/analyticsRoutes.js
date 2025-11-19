const express = require('express');
const router = express.Router();
const { authenticate } = require('../middleware/auth');

// Placeholder - em produção, implementar controller de analytics
router.get('/', authenticate, async (req, res) => {
  try {
    const { period } = req.query;
    // Por enquanto, retornar dados vazios
    res.json({
      success: true,
      data: {
        totalMessages: 0,
        avgResponseTime: 0,
        resolutionRate: 0,
        satisfactionScore: 0,
        topIntents: [],
        channelDistribution: {
          whatsapp: 0,
          webchat: 0,
          email: 0
        }
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erro ao buscar analytics'
    });
  }
});

module.exports = router;


