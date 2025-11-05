// Database configuration with Prisma
const { PrismaClient } = require('@prisma/client');

// Singleton pattern para Prisma Client
const prisma = new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
});

// Graceful shutdown
process.on('beforeExit', async () => {
  await prisma.$disconnect();
});

// Database functions
const db = {
  // User operations
  async findUserByEmail(email) {
    try {
      return await prisma.user.findUnique({
        where: { email }
      });
    } catch (error) {
      console.error('Error finding user by email:', error);
      return null;
    }
  },
  
  async findUserById(id) {
    try {
      return await prisma.user.findUnique({
        where: { id: parseInt(id) }
      });
    } catch (error) {
      console.error('Error finding user by id:', error);
      return null;
    }
  },
  
  async createUser(userData) {
    try {
      return await prisma.user.create({
        data: userData
      });
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  },
  
  async getAllUsers() {
    try {
      return await prisma.user.findMany({
        select: {
          id: true,
          name: true,
          email: true,
          createdAt: true,
          updatedAt: true
          // password não é retornado
        }
      });
    } catch (error) {
      console.error('Error getting all users:', error);
      return [];
    }
  },

  // Conversation operations
  async getConversationStats(userId) {
    try {
      const total = await prisma.conversation.count({
        where: { userId }
      });
      
      const active = await prisma.conversation.count({
        where: { 
          userId,
          status: 'active'
        }
      });
      
      const resolved = await prisma.conversation.count({
        where: {
          userId,
          status: 'resolved',
          createdAt: {
            gte: new Date(new Date().setHours(0, 0, 0, 0)) // Hoje
          }
        }
      });
      
      const pending = await prisma.conversation.count({
        where: {
          userId,
          status: 'pending'
        }
      });
      
      return { total, active, resolved, pending };
    } catch (error) {
      console.error('Error getting conversation stats:', error);
      return { total: 0, active: 0, resolved: 0, pending: 0 };
    }
  },

  // Activity operations
  async getRecentActivities(userId, limit = 5) {
    try {
      return await prisma.activity.findMany({
        where: { userId },
        orderBy: { createdAt: 'desc' },
        take: limit,
        select: {
          type: true,
          message: true,
          createdAt: true
        }
      });
    } catch (error) {
      console.error('Error getting recent activities:', error);
      return [];
    }
  },

  async createActivity(userId, type, message) {
    try {
      return await prisma.activity.create({
        data: {
          userId,
          type,
          message
        }
      });
    } catch (error) {
      console.error('Error creating activity:', error);
      throw error;
    }
  },

  // Notification operations
  async getNotifications(userId, limit = 5) {
    try {
      return await prisma.notification.findMany({
        where: { userId },
        orderBy: { createdAt: 'desc' },
        take: limit,
        select: {
          id: true,
          type: true,
          message: true,
          read: true,
          createdAt: true
        }
      });
    } catch (error) {
      console.error('Error getting notifications:', error);
      return [];
    }
  },

  async createNotification(userId, type, message) {
    try {
      return await prisma.notification.create({
        data: {
          userId,
          type,
          message
        }
      });
    } catch (error) {
      console.error('Error creating notification:', error);
      throw error;
    }
  }
};

module.exports = db;
module.exports.prisma = prisma;
