// Main server file
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

// Import routes
const authRoutes = require('./routes/authRoutes');
const homeRoutes = require('./routes/homeRoutes');

// Initialize app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({
  origin: process.env.CORS_ORIGIN?.split(',') || ['http://localhost:8000'],
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check
app.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'SWAY Backend API is running',
    timestamp: new Date().toISOString()
  });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/home', homeRoutes);

// Serve frontend static files
const frontendPath = path.join(__dirname, '../../frontend/src');
app.use(express.static(frontendPath));

// Serve assets
app.use('/assets', express.static(path.join(frontendPath, 'assets')));

// Serve pages específicas
app.get('/login', (req, res) => {
  res.sendFile(path.join(frontendPath, 'pages/login.html'));
});
app.get('/register', (req, res) => {
  res.sendFile(path.join(frontendPath, 'pages/register.html'));
});
app.get('/home', (req, res) => {
  res.sendFile(path.join(frontendPath, 'pages/home.html'));
});
app.get('/termos', (req, res) => {
  res.sendFile(path.join(frontendPath, 'pages/termos.html'));
});
app.get('/privacidade', (req, res) => {
  res.sendFile(path.join(frontendPath, 'pages/privacidade.html'));
});

// Catch all handler: send back index.html for frontend routes
app.get('*', (req, res, next) => {
  // Skip API routes and health check
  if (req.path.startsWith('/api') || req.path.startsWith('/health')) {
    return res.status(404).json({
      success: false,
      message: 'Rota não encontrada'
    });
  }
  
  // Serve index.html for all other routes
  res.sendFile(path.join(frontendPath, 'index.html'));
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Erro interno do servidor',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 SWAY Backend running on port ${PORT}`);
  console.log(`📡 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🔗 API: http://localhost:${PORT}/api`);
  console.log(`💚 Health: http://localhost:${PORT}/health`);
});

module.exports = app;

