// Tenant detection middleware
const db = require('../config/database');

/**
 * Middleware para detectar e validar o tenant baseado no subdomínio
 */
async function detectTenant(req, res, next) {
  try {
    // Extrair subdomínio do host
    const host = req.get('host') || req.hostname;
    const subdomain = extractSubdomain(host);
    
    // Se não houver subdomínio, usar domínio principal (swaybrasil.com) ou localhost
    if (!subdomain || subdomain === 'www' || subdomain === 'swaybrasil') {
      // Domínio principal ou localhost - buscar company padrão "demo" para desenvolvimento
      // Em produção, isso pode ser ajustado conforme necessário
      try {
        let defaultCompany = await db.findCompanyBySubdomain('demo');
        
        // Se não existir, criar company demo automaticamente
        if (!defaultCompany) {
          defaultCompany = await db.createCompany({
            name: 'Empresa Demo',
            subdomain: 'demo',
            domain: 'demo.swaybrasil.com',
            active: true
          });
        }
        
        if (defaultCompany && defaultCompany.active) {
          req.tenant = defaultCompany;
          req.subdomain = 'demo';
          req.companyId = defaultCompany.id;
        } else {
          req.tenant = null;
          req.subdomain = null;
          req.companyId = null;
        }
      } catch (error) {
        console.error('Error finding/creating default company:', error);
        // Em caso de erro, permitir continuar sem tenant (para não bloquear tudo)
        req.tenant = null;
        req.subdomain = null;
        req.companyId = null;
      }
      
      return next();
    }
    
    // Buscar company pelo subdomínio
    const company = await db.findCompanyBySubdomain(subdomain);
    
    if (!company) {
      // Se for uma rota de API, bloquear
      // Se for uma rota de frontend (landing page), permitir
      if (req.path.startsWith('/api') && !req.path.startsWith('/api/companies')) {
        return res.status(404).json({
          success: false,
          message: 'Subdomínio não encontrado ou inativo'
        });
      }
      // Para rotas de frontend, permitir continuar (landing page)
      req.tenant = null;
      req.subdomain = null;
      req.companyId = null;
      return next();
    }
    
    if (!company.active) {
      // Se for uma rota de API, bloquear
      if (req.path.startsWith('/api')) {
        return res.status(403).json({
          success: false,
          message: 'Conta inativa. Entre em contato com o suporte.'
        });
      }
      // Para rotas de frontend, permitir continuar
      req.tenant = null;
      req.subdomain = null;
      req.companyId = null;
      return next();
    }
    
    // Adicionar tenant ao request
    req.tenant = company;
    req.subdomain = subdomain;
    req.companyId = company.id;
    
    next();
  } catch (error) {
    console.error('Error detecting tenant:', error);
    return res.status(500).json({
      success: false,
      message: 'Erro ao identificar tenant'
    });
  }
}

/**
 * Extrai o subdomínio do host
 * Exemplos:
 * - cliente1.swaybrasil.com -> cliente1
 * - www.swaybrasil.com -> null
 * - swaybrasil.com -> null
 * - localhost:3000 -> null
 */
function extractSubdomain(host) {
  // Remover porta se existir
  const hostWithoutPort = host.split(':')[0];
  
  // Se for localhost ou IP, não há subdomínio
  if (hostWithoutPort === 'localhost' || /^\d+\.\d+\.\d+\.\d+$/.test(hostWithoutPort)) {
    return null;
  }
  
  const parts = hostWithoutPort.split('.');
  
  // Se tiver menos de 2 partes, não há subdomínio
  if (parts.length < 2) {
    return null;
  }
  
  // Se for domínio principal (swaybrasil.com), não há subdomínio
  if (parts.length === 2 && (parts[0] === 'swaybrasil' || parts[0] === 'www')) {
    return null;
  }
  
  // Se tiver 3+ partes, o primeiro é o subdomínio
  if (parts.length >= 3) {
    const subdomain = parts[0];
    // Ignorar 'www'
    if (subdomain === 'www') {
      return parts.length > 3 ? parts[1] : null;
    }
    return subdomain;
  }
  
  return null;
}

/**
 * Middleware para garantir que há um tenant válido
 * Use em rotas que requerem tenant
 */
function requireTenant(req, res, next) {
  if (!req.tenant || !req.companyId) {
    return res.status(400).json({
      success: false,
      message: 'Tenant não identificado. Acesse através do subdomínio correto.'
    });
  }
  next();
}

module.exports = {
  detectTenant,
  requireTenant,
  extractSubdomain
};

