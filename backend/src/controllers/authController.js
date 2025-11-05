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
    const existingUser = db.findUserByEmail(email);
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: 'Email já cadastrado'
      });
    }
    
    // Hash password
    const hashedPassword = await hashPassword(password);
    
    // Create user
    const user = db.createUser({
      name,
      email,
      password: hashedPassword
    });
    
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
    const user = db.findUserByEmail(email);
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
    const user = db.findUserById(userId);
    
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
    return res.status(500).json({
      success: false,
      message: 'Erro ao buscar usuário',
      error: error.message
    });
  }
};

module.exports = {
  register,
  login,
  getMe
};

