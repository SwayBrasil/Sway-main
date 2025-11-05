// Authentication middleware
const { verifyToken } = require('../utils/jwt');

/**
 * Middleware to verify JWT token
 */
const authenticate = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1]; // Bearer TOKEN
    
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Token de autenticação não fornecido'
      });
    }
    
    const decoded = verifyToken(token);
    
    if (!decoded) {
      return res.status(401).json({
        success: false,
        message: 'Token inválido ou expirado'
      });
    }
    
    // Adiciona dados do usuário ao request
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Erro na autenticação',
      error: error.message
    });
  }
};

module.exports = {
  authenticate
};

