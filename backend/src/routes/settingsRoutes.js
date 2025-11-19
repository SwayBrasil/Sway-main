const express = require('express');
const router = express.Router();
const { authenticate } = require('../middleware/auth');

// Placeholder - em produção, implementar controller de settings
router.get('/', authenticate, async (req, res) => {
  try {
    // Por enquanto, retornar settings padrão
    res.json({
      success: true,
      data: {
        notifications: {
          email: true,
          push: true,
          sms: false
        },
        preferences: {
          language: 'pt-BR',
          timezone: 'America/Sao_Paulo',
          theme: 'light'
        },
        integrations: {
          whatsapp: false,
          webchat: false,
          email: false
        }
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erro ao buscar configurações'
    });
  }
});

router.put('/', authenticate, async (req, res) => {
  try {
    // Por enquanto, apenas confirmar salvamento
    res.json({
      success: true,
      message: 'Configurações salvas com sucesso'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erro ao salvar configurações'
    });
  }
});

module.exports = router;


