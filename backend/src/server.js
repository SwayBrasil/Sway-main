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

// Serve frontend static files (React build ou desenvolvimento)
const frontendDistPath = path.join(__dirname, '../../frontend/dist');
const frontendPublicPath = path.join(__dirname, '../../frontend/public');
const frontendIndexPath = path.join(__dirname, '../../frontend/index.html');
const frontendSrcPath = path.join(__dirname, '../../frontend/src');
const frontendNodeModulesPath = path.join(__dirname, '../../frontend/node_modules');

// Serve assets from public folder (imagens, etc)
app.use('/assets', express.static(path.join(frontendPublicPath, 'assets')));

// Check if build exists (production or development with build)
const buildExists = require('fs').existsSync(frontendDistPath);

if (buildExists) {
  // Serve built React app (production or development with build)
  app.use(express.static(frontendDistPath));
  
  // Catch all handler: send back index.html for frontend routes (React Router)
  app.get('*', (req, res, next) => {
    // Skip API routes and health check
    if (req.path.startsWith('/api') || req.path.startsWith('/health')) {
      return res.status(404).json({
        success: false,
        message: 'Rota não encontrada'
      });
    }
    
    // Serve React app index.html for all other routes
    res.sendFile(path.join(frontendDistPath, 'index.html'));
  });
} else {
  // In development, serve frontend files directly
  // Serve src files (React components, etc)
  app.use('/src', express.static(frontendSrcPath));
  
  // Serve node_modules for Vite dependencies
  app.use('/node_modules', express.static(frontendNodeModulesPath));
  
  // Serve index.html for all frontend routes (React Router will handle routing)
  app.get('*', (req, res, next) => {
    // Skip API routes and health check
    if (req.path.startsWith('/api') || req.path.startsWith('/health')) {
      return next();
    }
    
    // Serve index.html for all frontend routes
    if (require('fs').existsSync(frontendIndexPath)) {
      res.sendFile(frontendIndexPath);
    } else {
      res.status(404).json({
        success: false,
        message: 'Frontend não encontrado. Certifique-se de que o frontend está configurado corretamente.'
      });
    }
  });
}

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

