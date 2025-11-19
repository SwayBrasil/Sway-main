// Authentication controller
const db = require('../config/database');
const { hashPassword, comparePassword } = require('../utils/hash');
const { generateToken } = require('../utils/jwt');

/**
 * Register new user
 */
const register = async (req, res) => {
  try {
    const { name, cpfCnpj, email, password } = req.body;
    
    // Validations
    if (!name || !cpfCnpj || !password) {
      return res.status(400).json({
        success: false,
        message: 'Nome, CPF/CNPJ e senha são obrigatórios'
      });
    }
    
    // Validar formato CPF/CNPJ (remover caracteres não numéricos)
    const cleanCpfCnpj = cpfCnpj.replace(/\D/g, '');
    
    if (cleanCpfCnpj.length !== 11 && cleanCpfCnpj.length !== 14) {
      return res.status(400).json({
        success: false,
        message: 'CPF deve ter 11 dígitos ou CNPJ deve ter 14 dígitos'
      });
    }
    
    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Senha deve ter no mínimo 6 caracteres'
      });
    }
    
    // Verificar se há tenant (subdomínio ou company padrão)
    let companyId = req.companyId;
    
    if (!companyId) {
      // Tentar criar ou buscar company padrão "demo"
      try {
        let defaultCompany = await db.findCompanyBySubdomain('demo');
        
        if (!defaultCompany) {
          // Criar company demo se não existir
          defaultCompany = await db.createCompany({
            name: 'Empresa Demo',
            subdomain: 'demo',
            domain: 'demo.swaybrasil.com',
            active: true
          });
        }
        
        // Atualizar req para usar a company demo
        companyId = defaultCompany.id;
        req.companyId = defaultCompany.id;
        req.tenant = defaultCompany;
        req.subdomain = 'demo';
      } catch (error) {
        console.error('Error creating/finding default company:', error);
        return res.status(400).json({
          success: false,
          message: 'Acesso deve ser feito através do subdomínio da empresa ou entre em contato com o suporte'
        });
      }
    }
    
    // Check if user already exists (dentro da mesma company)
    const existingUser = await db.findUserByCpfCnpj(cleanCpfCnpj, companyId);
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: 'CPF/CNPJ já cadastrado'
      });
    }
    
    // Hash password
    const hashedPassword = await hashPassword(password);
    
    // Create user (usar companyId que foi definido acima)
    const user = await db.createUser({
      name,
      cpfCnpj: cleanCpfCnpj,
      email: email || null,
      password: hashedPassword,
      provider: 'local',
      companyId: companyId
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
      cpfCnpj: user.cpfCnpj,
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
    const { cpfCnpj, password } = req.body;
    
    // Validations
    if (!cpfCnpj || !password) {
      return res.status(400).json({
        success: false,
        message: 'CPF/CNPJ e senha são obrigatórios'
      });
    }
    
    // Limpar CPF/CNPJ (remover caracteres não numéricos)
    const cleanCpfCnpj = cpfCnpj.replace(/\D/g, '');
    
    // Verificar se há tenant (subdomínio ou company padrão)
    let companyId = req.companyId;
    
    if (!companyId) {
      // Tentar buscar ou criar company padrão "demo"
      try {
        let defaultCompany = await db.findCompanyBySubdomain('demo');
        
        // Se não existir, criar automaticamente
        if (!defaultCompany) {
          defaultCompany = await db.createCompany({
            name: 'Empresa Demo',
            subdomain: 'demo',
            domain: 'demo.swaybrasil.com',
            active: true
          });
        }
        
        if (defaultCompany && defaultCompany.active) {
          companyId = defaultCompany.id;
          req.companyId = companyId;
        } else {
          return res.status(400).json({
            success: false,
            message: 'Acesso deve ser feito através do subdomínio da empresa'
          });
        }
      } catch (error) {
        console.error('Error finding/creating default company:', error);
        return res.status(400).json({
          success: false,
          message: 'Acesso deve ser feito através do subdomínio da empresa'
        });
      }
    }
    
    // Find user (dentro da mesma company)
    const user = await db.findUserByCpfCnpj(cleanCpfCnpj, companyId);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'CPF/CNPJ ou senha inválidos'
      });
    }
    
    // Verificar se usuário tem login social (sem senha)
    if (!user.password) {
      return res.status(401).json({
        success: false,
        message: `Este email está cadastrado via ${user.provider || 'login social'}. Use o login social.`
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
      cpfCnpj: user.cpfCnpj,
      name: user.name
    });
    
    // Create login activity
    try {
      await db.createActivity(user.id, 'login', 'Login realizado com sucesso');
    } catch (activityError) {
      console.error('Error creating login activity:', activityError);
    }
    
    // Remove password from response
    const { password: _, ...userWithoutPassword } = user;
    
    return res.json({
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
    const userId = req.user?.id;
    const companyId = req.companyId;
    
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: 'Usuário não autenticado'
      });
    }
    
    // Verificar se o usuário pertence à company do subdomínio
    const user = await db.findUserById(userId, companyId);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Usuário não encontrado'
      });
    }
    
    // Verificar se o usuário autenticado pertence à mesma company
    if (user.companyId !== companyId) {
      return res.status(403).json({
        success: false,
        message: 'Acesso negado'
      });
    }
    
    // Remove password from response
    const { password: _, ...userWithoutPassword } = user;
    
    return res.json({
      success: true,
      data: {
        user: userWithoutPassword
      }
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Erro ao buscar usuário',
      error: error.message
    });
  }
};

/**
 * Update user profile
 */
const updateProfile = async (req, res) => {
  try {
    const userId = req.user?.id;
    const { name, email } = req.body;
    
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: 'Usuário não autenticado'
      });
    }
    
    // Check if email is already taken by another user
    if (email) {
      const existingUser = await db.findUserByEmail(email);
      if (existingUser && existingUser.id !== userId) {
        return res.status(409).json({
          success: false,
          message: 'Email já está em uso por outra conta'
        });
      }
    }
    
    const updateData = {};
    if (name) updateData.name = name;
    if (email) updateData.email = email;
    
    const updatedUser = await db.updateUser(userId, updateData);
    
    // Create activity
    try {
      await db.createActivity(userId, 'profile_update', 'Perfil atualizado');
    } catch (activityError) {
      console.error('Error creating activity:', activityError);
    }
    
    // Remove password from response
    const { password: _, ...userWithoutPassword } = updatedUser;
    
    return res.json({
      success: true,
      message: 'Perfil atualizado com sucesso',
      data: {
        user: userWithoutPassword
      }
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Erro ao atualizar perfil',
      error: error.message
    });
  }
};

/**
 * Change password
 */
const changePassword = async (req, res) => {
  try {
    const userId = req.user?.id;
    const { currentPassword, newPassword } = req.body;
    
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: 'Usuário não autenticado'
      });
    }
    
    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: 'Senha atual e nova senha são obrigatórias'
      });
    }
    
    if (newPassword.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'A nova senha deve ter no mínimo 6 caracteres'
      });
    }
    
    const user = await db.findUserById(userId);
    
    if (!user || !user.password) {
      return res.status(400).json({
        success: false,
        message: 'Usuário não possui senha cadastrada'
      });
    }
    
    // Verify current password
    const isPasswordValid = await comparePassword(currentPassword, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Senha atual incorreta'
      });
    }
    
    // Hash new password
    const hashedPassword = await hashPassword(newPassword);
    
    // Update password
    await db.updateUserPassword(userId, hashedPassword);
    
    // Create activity
    try {
      await db.createActivity(userId, 'password_change', 'Senha alterada');
    } catch (activityError) {
      console.error('Error creating activity:', activityError);
    }
    
    return res.json({
      success: true,
      message: 'Senha alterada com sucesso'
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Erro ao alterar senha',
      error: error.message
    });
  }
};

/**
 * Forgot password
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
    
    const user = await db.findUserByEmail(email);
    
    // Sempre retornar sucesso para não expor se o email existe
    if (!user) {
      return res.json({
        success: true,
        message: 'Se o email existir, você receberá instruções para redefinir sua senha'
      });
    }
    
    // Gerar token de reset
    const crypto = require('crypto');
    const token = crypto.randomBytes(32).toString('hex');
    const expiresAt = new Date(Date.now() + 3600000); // 1 hora
    
    await db.createPasswordReset(user.id, token, expiresAt);
    
    // Em produção, enviar e-mail aqui
    console.log(`Password reset token for ${email}: ${token}`);
    console.log(`Reset URL: ${process.env.FRONTEND_URL || 'http://localhost:3000'}/reset-password?token=${token}`);
    
    return res.json({
      success: true,
      message: 'Se o email existir, você receberá instruções para redefinir sua senha'
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Erro ao processar solicitação',
      error: error.message
    });
  }
};

/**
 * Reset password
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
    
    if (new Date(passwordReset.expiresAt) < new Date()) {
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
      await db.createActivity(passwordReset.userId, 'password_reset', 'Senha redefinida via e-mail');
    } catch (activityError) {
      console.error('Error creating activity:', activityError);
    }
    
    return res.json({
      success: true,
      message: 'Senha redefinida com sucesso'
    });
  } catch (error) {
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
  updateProfile,
  changePassword,
  forgotPassword,
  resetPassword
};
