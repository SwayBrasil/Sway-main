// Authentication controller
const db = require('../config/database');
const { hashPassword, comparePassword } = require('../utils/hash');
const { generateToken } = require('../utils/jwt');

/**
 * Register new user
 */
const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    // Validations
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Nome, email e senha são obrigatórios'
      });
    }
    
    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Senha deve ter no mínimo 6 caracteres'
      });
    }
    
    // Check if user already exists
    const existingUser = await db.findUserByEmail(email);
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: 'Email já cadastrado'
      });
    }
    
    // Hash password
    const hashedPassword = await hashPassword(password);
    
    // Create user
    const user = await db.createUser({
      name,
      email,
      password: hashedPassword
    });
    
    // Create welcome activity
    try {
      await db.createActivity(user.id, 'register', 'Usuário criado com sucesso');
    } catch (activityError) {
      console.error('Error creating welcome activity:', activityError);
      // Não falha o registro se a atividade não for criada
    }
    
    // Generate token
    const token = generateToken({
      id: user.id,
      email: user.email,
      name: user.name
    });
    
    // Remove password from response
    const { password: _, ...userWithoutPassword } = user;
    
    return res.status(201).json({
      success: true,
      message: 'Usuário cadastrado com sucesso',
      data: {
        user: userWithoutPassword,
        token
      }
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Erro ao cadastrar usuário',
      error: error.message
    });
  }
};

/**
 * Login user
 */
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Validations
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email e senha são obrigatórios'
      });
    }
    
    // Find user
    const user = await db.findUserByEmail(email);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Email ou senha inválidos'
      });
    }
    
    // Check password
    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Email ou senha inválidos'
      });
    }
    
    // Generate token
    const token = generateToken({
      id: user.id,
      email: user.email,
      name: user.name
    });
    
    // Create login activity
    try {
      await db.createActivity(user.id, 'login', 'Login realizado com sucesso');
    } catch (activityError) {
      console.error('Error creating login activity:', activityError);
      // Não falha o login se a atividade não for criada
    }
    
    // Remove password from response
    const { password: _, ...userWithoutPassword } = user;
    
    return res.status(200).json({
      success: true,
      message: 'Login realizado com sucesso',
      data: {
        user: userWithoutPassword,
        token
      }
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Erro ao fazer login',
      error: error.message
    });
  }
};

/**
 * Get current user
 */
const getMe = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await db.findUserById(userId);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Usuário não encontrado'
      });
    }
    
    // Remove password from response
    const { password: _, ...userWithoutPassword } = user;
    
    return res.status(200).json({
      success: true,
      data: {
        user: userWithoutPassword
      }
    });
  } catch (error) {
    console.error('Error in getMe:', error);
    return res.status(500).json({
      success: false,
      message: 'Erro ao buscar usuário',
      error: error.message
    });
  }
};

/**
 * Request password reset
 */
const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    
    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Email é obrigatório'
      });
    }
    
    // Find user
    const user = await db.findUserByEmail(email);
    
    // Sempre retorna sucesso para não expor se o email existe
    if (!user) {
      return res.status(200).json({
        success: true,
        message: 'Se o email existir, você receberá instruções para redefinir sua senha'
      });
    }
    
    // Generate reset token
    const crypto = require('crypto');
    const token = crypto.randomBytes(32).toString('hex');
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 1); // Token válido por 1 hora
    
    // Save token
    await db.createPasswordReset(user.id, token, expiresAt);
    
    // TODO: Enviar email com link de reset
    // Por enquanto, apenas logamos o token (em produção, enviar email)
    console.log(`Password reset token for ${email}: ${token}`);
    console.log(`Reset link: ${process.env.FRONTEND_URL || 'http://localhost:3000'}/reset-password?token=${token}`);
    
    return res.status(200).json({
      success: true,
      message: 'Se o email existir, você receberá instruções para redefinir sua senha',
      // Em desenvolvimento, retornamos o token (remover em produção)
      ...(process.env.NODE_ENV === 'development' && { token })
    });
  } catch (error) {
    console.error('Error in forgotPassword:', error);
    return res.status(500).json({
      success: false,
      message: 'Erro ao processar solicitação de reset de senha',
      error: error.message
    });
  }
};

/**
 * Reset password with token
 */
const resetPassword = async (req, res) => {
  try {
    const { token, password } = req.body;
    
    if (!token || !password) {
      return res.status(400).json({
        success: false,
        message: 'Token e senha são obrigatórios'
      });
    }
    
    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Senha deve ter no mínimo 6 caracteres'
      });
    }
    
    // Find reset token
    const passwordReset = await db.findPasswordResetByToken(token);
    
    if (!passwordReset) {
      return res.status(400).json({
        success: false,
        message: 'Token inválido ou expirado'
      });
    }
    
    if (passwordReset.used) {
      return res.status(400).json({
        success: false,
        message: 'Token já foi utilizado'
      });
    }
    
    if (new Date() > passwordReset.expiresAt) {
      return res.status(400).json({
        success: false,
        message: 'Token expirado'
      });
    }
    
    // Hash new password
    const hashedPassword = await hashPassword(password);
    
    // Update user password
    await db.updateUserPassword(passwordReset.userId, hashedPassword);
    
    // Mark token as used
    await db.markPasswordResetAsUsed(token);
    
    // Create activity
    try {
      await db.createActivity(passwordReset.userId, 'password_reset', 'Senha redefinida com sucesso');
    } catch (activityError) {
      console.error('Error creating password reset activity:', activityError);
    }
    
    return res.status(200).json({
      success: true,
      message: 'Senha redefinida com sucesso'
    });
  } catch (error) {
    console.error('Error in resetPassword:', error);
    return res.status(500).json({
      success: false,
      message: 'Erro ao redefinir senha',
      error: error.message
    });
  }
};

module.exports = {
  register,
  login,
  getMe,
  forgotPassword,
  resetPassword
};

