// Password hashing utilities
const bcrypt = require('bcryptjs');
const authConfig = require('../config/auth');

/**
 * Hash password
 */
const hashPassword = async (password) => {
  return await bcrypt.hash(password, authConfig.bcryptRounds);
};

/**
 * Compare password with hash
 */
const comparePassword = async (password, hash) => {
  return await bcrypt.compare(password, hash);
};

module.exports = {
  hashPassword,
  comparePassword
};

