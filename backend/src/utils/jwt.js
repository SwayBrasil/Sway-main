// JWT utilities
const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth');

/**
 * Generate JWT token
 */
const generateToken = (payload) => {
  return jwt.sign(payload, authConfig.jwtSecret, {
    expiresIn: authConfig.jwtExpiresIn
  });
};

/**
 * Verify JWT token
 */
const verifyToken = (token) => {
  try {
    return jwt.verify(token, authConfig.jwtSecret);
  } catch (error) {
    return null;
  }
};

module.exports = {
  generateToken,
  verifyToken
};

