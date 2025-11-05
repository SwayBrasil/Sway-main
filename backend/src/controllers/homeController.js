// Home controller
const db = require('../config/database');

/**
 * Get home dashboard data
 */
const getHome = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = db.findUserById(userId);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Usuário não encontrado'
      });
    }
    
    // Dashboard data (customize conforme necessário)
    const dashboardData = {
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      },
      stats: {
        totalConversations: 0,
        activeConversations: 0,
        resolvedToday: 0,
        pendingHandovers: 0
      },
      recentActivity: [],
      notifications: []
    };
    
    return res.status(200).json({
      success: true,
      message: 'Dados do dashboard carregados com sucesso',
      data: dashboardData
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Erro ao carregar dashboard',
      error: error.message
    });
  }
};

module.exports = {
  getHome
};

