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
  // Company operations
  async findCompanyBySubdomain(subdomain) {
    try {
      if (!prisma) {
        console.error('Prisma client not initialized');
        return null;
      }
      const company = await prisma.company.findUnique({
        where: { subdomain }
      });
      return company;
    } catch (error) {
      console.error('Error finding company by subdomain:', error);
      console.error('Error details:', error.message);
      return null;
    }
  },

  async findCompanyById(id) {
    try {
      return await prisma.company.findUnique({
        where: { id: parseInt(id) }
      });
    } catch (error) {
      console.error('Error finding company by id:', error);
      return null;
    }
  },

  async createCompany(companyData) {
    try {
      return await prisma.company.create({
        data: companyData
      });
    } catch (error) {
      console.error('Error creating company:', error);
      throw error;
    }
  },

  // User operations
  async findUserByCpfCnpj(cpfCnpj, companyId = null) {
    try {
      const where = { cpfCnpj };
      if (companyId) {
        where.companyId = companyId;
      }
      return await prisma.user.findFirst({
        where
      });
    } catch (error) {
      console.error('Error finding user by cpfCnpj:', error);
      return null;
    }
  },
  
  async findUserByEmail(email, companyId = null) {
    try {
      const where = { email };
      if (companyId) {
        where.companyId = companyId;
      }
      return await prisma.user.findFirst({
        where
      });
    } catch (error) {
      console.error('Error finding user by email:', error);
      return null;
    }
  },
  
  async findUserById(id, companyId = null) {
    try {
      const where = { id: parseInt(id) };
      if (companyId) {
        where.companyId = companyId;
      }
      return await prisma.user.findFirst({
        where,
        include: {
          company: true
        }
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

  async updateUser(userId, userData) {
    try {
      return await prisma.user.update({
        where: { id: parseInt(userId) },
        data: userData
      });
    } catch (error) {
      console.error('Error updating user:', error);
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
  async getConversationStats(companyId, userId = null) {
    try {
      const where = {};
      
      // Se tiver companyId, filtrar por company através dos users
      if (companyId) {
        where.user = { companyId };
      }
      
      // Se tiver userId específico, adicionar ao filtro
      if (userId) {
        where.userId = userId;
      }
      
      const total = await prisma.conversation.count({ where });
      
      const active = await prisma.conversation.count({
        where: { 
          ...where,
          status: 'active'
        }
      });
      
      const resolved = await prisma.conversation.count({
        where: {
          ...where,
          status: 'resolved',
          createdAt: {
            gte: new Date(new Date().setHours(0, 0, 0, 0)) // Hoje
          }
        }
      });
      
      const pending = await prisma.conversation.count({
        where: {
          ...where,
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
  async getRecentActivities(companyId, userId = null, limit = 5) {
    try {
      const where = {};
      
      if (companyId) {
        where.user = { companyId };
      }
      
      if (userId) {
        where.userId = userId;
      }
      
      return await prisma.activity.findMany({
        where,
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
  async getNotifications(companyId, userId = null, limit = 5) {
    try {
      const where = {};
      
      if (companyId) {
        where.user = { companyId };
      }
      
      if (userId) {
        where.userId = userId;
      }
      
      return await prisma.notification.findMany({
        where,
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
  },

  // Password reset operations
  async createPasswordReset(userId, token, expiresAt) {
    try {
      // Invalidar tokens anteriores não usados
      await prisma.passwordReset.updateMany({
        where: {
          userId,
          used: false
        },
        data: {
          used: true
        }
      });

      return await prisma.passwordReset.create({
        data: {
          userId,
          token,
          expiresAt
        }
      });
    } catch (error) {
      console.error('Error creating password reset:', error);
      throw error;
    }
  },

  async findPasswordResetByToken(token) {
    try {
      return await prisma.passwordReset.findUnique({
        where: { token },
        include: { user: true }
      });
    } catch (error) {
      console.error('Error finding password reset by token:', error);
      return null;
    }
  },

  async markPasswordResetAsUsed(token) {
    try {
      return await prisma.passwordReset.update({
        where: { token },
        data: { used: true }
      });
    } catch (error) {
      console.error('Error marking password reset as used:', error);
      throw error;
    }
  },

  async updateUserPassword(userId, hashedPassword) {
    try {
      return await prisma.user.update({
        where: { id: userId },
        data: { password: hashedPassword }
      });
    } catch (error) {
      console.error('Error updating user password:', error);
      throw error;
    }
  },

  // Subscription operations
  async createSubscription(subscriptionData) {
    try {
      return await prisma.subscription.create({
        data: subscriptionData
      });
    } catch (error) {
      console.error('Error creating subscription:', error);
      throw error;
    }
  },

  async findActiveSubscriptionByUser(userId) {
    try {
      return await prisma.subscription.findFirst({
        where: {
          userId,
          status: 'active',
          OR: [
            { endDate: null },
            { endDate: { gte: new Date() } }
          ]
        },
        orderBy: { createdAt: 'desc' }
      });
    } catch (error) {
      console.error('Error finding active subscription:', error);
      return null;
    }
  },

  async updateSubscription(subscriptionId, data) {
    try {
      return await prisma.subscription.update({
        where: { id: subscriptionId },
        data
      });
    } catch (error) {
      console.error('Error updating subscription:', error);
      throw error;
    }
  },

  // Order operations
  async createOrder(orderData) {
    try {
      return await prisma.order.create({
        data: orderData
      });
    } catch (error) {
      console.error('Error creating order:', error);
      throw error;
    }
  },

  async findOrderById(orderId) {
    try {
      return await prisma.order.findUnique({
        where: { id: parseInt(orderId) },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true
            }
          },
          subscription: true
        }
      });
    } catch (error) {
      console.error('Error finding order by id:', error);
      return null;
    }
  },

  async updateOrder(orderId, data) {
    try {
      return await prisma.order.update({
        where: { id: parseInt(orderId) },
        data
      });
    } catch (error) {
      console.error('Error updating order:', error);
      throw error;
    }
  },

  async getUserOrders(userId) {
    try {
      return await prisma.order.findMany({
        where: { userId },
        orderBy: { createdAt: 'desc' },
        include: {
          subscription: true
        }
      });
    } catch (error) {
      console.error('Error getting user orders:', error);
      return [];
    }
  }
};

module.exports = db;
module.exports.prisma = prisma;
