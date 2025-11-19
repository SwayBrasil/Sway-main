// Home controller
const db = require('../config/database');

/**
 * Get home dashboard data
 */
const getHome = async (req, res) => {
  try {
    const userId = req.user?.id;
    const companyId = req.companyId;
    
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: 'Usuário não autenticado'
      });
    }
    
    if (!companyId) {
      return res.status(400).json({
        success: false,
        message: 'Tenant não identificado'
      });
    }
    
    // Buscar dados do usuário (verificando se pertence à company)
    const user = await db.findUserById(userId, companyId);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Usuário não encontrado'
      });
    }
    
    // Verificar se o usuário pertence à company do subdomínio
    if (user.companyId !== companyId) {
      return res.status(403).json({
        success: false,
        message: 'Acesso negado'
      });
    }
    
    // Buscar estatísticas de conversas (filtrado por company)
    const stats = await db.getConversationStats(companyId, userId);
    
    // Buscar atividades recentes (filtrado por company)
    const activities = await db.getRecentActivities(companyId, userId, 5);
    
    // Buscar notificações (filtrado por company)
    const notifications = await db.getNotifications(companyId, userId, 5);
    
    // Dashboard data
    const dashboardData = {
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      },
      stats: {
        totalConversations: stats.total,
        activeConversations: stats.active,
        resolvedToday: stats.resolved,
        pendingHandovers: stats.pending
      },
      recentActivity: activities.map(activity => ({
        type: activity.type,
        message: activity.message,
        time: activity.createdAt
      })),
      notifications: notifications.map(notif => ({
        id: notif.id,
        type: notif.type,
        message: notif.message,
        read: notif.read,
        time: notif.createdAt
      }))
    };
    
    return res.status(200).json({
      success: true,
      message: 'Dados do dashboard carregados com sucesso',
      data: dashboardData
    });
  } catch (error) {
    console.error('Error in getHome:', error);
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

