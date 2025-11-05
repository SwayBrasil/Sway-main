// Home controller
const db = require('../config/database');

/**
 * Get home dashboard data
 */
const getHome = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await db.findUserById(userId);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Usuário não encontrado'
      });
    }
    
    // Get stats from database
    const stats = await db.getConversationStats(userId);
    
    // Get recent activities
    const activities = await db.getRecentActivities(userId, 5);
    
    // Get notifications
    const notifications = await db.getNotifications(userId, 5);
    
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

