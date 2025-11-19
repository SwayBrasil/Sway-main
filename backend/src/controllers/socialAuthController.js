const db = require('../config/database');
const { generateToken } = require('../utils/jwt');

/**
 * Iniciar autenticação OAuth
 */
const initiateOAuth = async (req, res) => {
  try {
    const { provider } = req.params;
    
    // URLs de callback (em produção, use variáveis de ambiente)
    const callbacks = {
      google: `${process.env.FRONTEND_URL || 'http://localhost:3000'}/auth/callback/google`,
      facebook: `${process.env.FRONTEND_URL || 'http://localhost:3000'}/auth/callback/facebook`,
      apple: `${process.env.FRONTEND_URL || 'http://localhost:3000'}/auth/callback/apple`
    };

    // Em produção, você usaria bibliotecas como:
    // - passport-google-oauth20 para Google
    // - passport-facebook para Facebook
    // - passport-apple para Apple
    
    // Por enquanto, vamos criar uma URL de autorização simulada
    // Em produção, isso seria feito com as bibliotecas OAuth apropriadas
    
    const authUrl = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/auth/callback/${provider}?code=simulated&state=${Date.now()}`;
    
    res.redirect(authUrl);
  } catch (error) {
    console.error('Error initiating OAuth:', error);
    res.status(500).json({
      success: false,
      message: 'Erro ao iniciar autenticação social'
    });
  }
};

/**
 * Callback OAuth - processar retorno do provedor
 */
const handleOAuthCallback = async (req, res) => {
  try {
    const { provider } = req.params;
    const { code, state } = req.query;
    
    // Em produção, aqui você:
    // 1. Troca o código por um access_token com o provedor
    // 2. Busca informações do usuário com o access_token
    // 3. Cria ou atualiza o usuário no banco
    
    // Por enquanto, vamos simular dados do usuário
    // Em produção, você faria requisições reais para os provedores
    
    let userData = {};
    
    if (provider === 'google') {
      // Simulação - em produção, use Google OAuth API
      userData = {
        provider: 'google',
        providerId: `google_${Date.now()}`,
        email: `user${Date.now()}@gmail.com`,
        name: 'Usuário Google',
        avatar: null
      };
    } else if (provider === 'facebook') {
      // Simulação - em produção, use Facebook Graph API
      userData = {
        provider: 'facebook',
        providerId: `facebook_${Date.now()}`,
        email: `user${Date.now()}@facebook.com`,
        name: 'Usuário Facebook',
        avatar: null
      };
    } else if (provider === 'apple') {
      // Simulação - em produção, use Apple Sign In API
      userData = {
        provider: 'apple',
        providerId: `apple_${Date.now()}`,
        email: `user${Date.now()}@icloud.com`,
        name: 'Usuário Apple',
        avatar: null
      };
    }

    // Verificar se há tenant (subdomínio)
    const companyId = req.companyId;
    
    if (!companyId) {
      const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
      return res.redirect(`${frontendUrl}/auth/callback/${provider}?success=false&error=${encodeURIComponent('Acesso deve ser feito através do subdomínio da empresa')}`);
    }
    
    // Verificar se usuário já existe (dentro da mesma company)
    let user = await db.findUserByEmail(userData.email, companyId);
    
    if (!user) {
      // Criar novo usuário
      user = await db.createUser({
        name: userData.name,
        email: userData.email,
        password: null, // Sem senha para login social
        provider: userData.provider,
        providerId: userData.providerId,
        avatar: userData.avatar,
        companyId
      });
      
      // Criar atividade
      await db.createActivity(user.id, 'register', `Usuário criado via ${provider}`);
    } else {
      // Atualizar informações se necessário
      if (!user.provider || user.provider !== userData.provider) {
        await db.updateUser(user.id, {
          provider: userData.provider,
          providerId: userData.providerId,
          avatar: userData.avatar
        });
      }
      
      // Criar atividade
      await db.createActivity(user.id, 'login', `Login via ${provider}`);
    }

    // Gerar token JWT
    const token = generateToken({
      id: user.id,
      email: user.email,
      name: user.name
    });

    // Redirecionar para frontend com token
    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
    res.redirect(`${frontendUrl}/auth/callback/${provider}?token=${token}&success=true`);
  } catch (error) {
    console.error('Error handling OAuth callback:', error);
    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
    res.redirect(`${frontendUrl}/auth/callback/${provider}?success=false&error=${encodeURIComponent('Erro ao processar autenticação')}`);
  }
};

module.exports = {
  initiateOAuth,
  handleOAuthCallback
};

