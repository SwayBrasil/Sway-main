// Main server file
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

// Import routes
const authRoutes = require('./routes/authRoutes');
const homeRoutes = require('./routes/homeRoutes');
const checkoutRoutes = require('./routes/checkoutRoutes');
const conversationsRoutes = require('./routes/conversationsRoutes');
const analyticsRoutes = require('./routes/analyticsRoutes');
const settingsRoutes = require('./routes/settingsRoutes');
const companyRoutes = require('./routes/companyRoutes');

// Import tenant middleware
const { detectTenant } = require('./middleware/tenant');

// Initialize app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
// CORS configurado para aceitar subdomínios
const corsOptions = {
  origin: function (origin, callback) {
    // Permitir requisições sem origin (mobile apps, Postman, etc)
    if (!origin) return callback(null, true);
    
    // Lista de origens permitidas
    const allowedOrigins = process.env.CORS_ORIGIN?.split(',') || [
      'http://localhost:3000',
      'http://localhost:8000',
      'https://swaybrasil.com',
      'https://www.swaybrasil.com'
    ];
    
    // Permitir localhost em qualquer porta (desenvolvimento)
    if (origin.startsWith('http://localhost:') || origin.startsWith('http://127.0.0.1:')) {
      return callback(null, true);
    }
    
    // Permitir subdomínios de swaybrasil.com
    if (origin.includes('.swaybrasil.com') || origin.includes('swaybrasil.com')) {
      return callback(null, true);
    }
    
    // Verificar se está na lista de permitidos
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    
    callback(new Error('Not allowed by CORS'));
  },
  credentials: true
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Tenant detection middleware (antes das rotas)
// Aplica em todas as rotas, mas não bloqueia se não houver subdomínio
app.use(detectTenant);


// API Routes
// Rotas públicas que não requerem tenant (landing page, etc)
app.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'SWAY Backend API is running',
    timestamp: new Date().toISOString()
  });
});

// Rotas que requerem tenant (subdomínio)
app.use('/api/auth', authRoutes);
app.use('/api/home', homeRoutes);
app.use('/api/checkout', checkoutRoutes);
app.use('/api/conversations', conversationsRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/settings', settingsRoutes);

// Rotas de admin (criar companies) - pode ser acessado sem subdomínio
app.use('/api/companies', companyRoutes);

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
    // Skip API routes
    if (req.path.startsWith('/api')) {
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
    // Skip API routes
    if (req.path.startsWith('/api')) {
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

