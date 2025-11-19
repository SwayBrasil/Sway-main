// Company management routes (admin only)
const express = require('express');
const router = express.Router();
const db = require('../config/database');
const { authenticate } = require('../middleware/auth');

// Criar nova company (apenas para admin/setup inicial)
router.post('/', async (req, res) => {
  try {
    const { name, subdomain, cnpj } = req.body;
    
    if (!name || !subdomain) {
      return res.status(400).json({
        success: false,
        message: 'Nome e subdomínio são obrigatórios'
      });
    }
    
    // Validar formato do subdomínio
    if (!/^[a-z0-9-]+$/.test(subdomain)) {
      return res.status(400).json({
        success: false,
        message: 'Subdomínio inválido. Use apenas letras minúsculas, números e hífens.'
      });
    }
    
    const domain = `${subdomain}.swaybrasil.com`;
    
    const company = await db.createCompany({
      name,
      subdomain,
      domain,
      cnpj: cnpj || null,
      active: true
    });
    
    return res.status(201).json({
      success: true,
      message: 'Empresa criada com sucesso',
      data: {
        company: {
          id: company.id,
          name: company.name,
          subdomain: company.subdomain,
          domain: company.domain
        }
      }
    });
  } catch (error) {
    if (error.code === 'P2002') {
      return res.status(409).json({
        success: false,
        message: 'Subdomínio já está em uso'
      });
    }
    
    return res.status(500).json({
      success: false,
      message: 'Erro ao criar empresa',
      error: error.message
    });
  }
});

// Listar companies (admin)
router.get('/', authenticate, async (req, res) => {
  try {
    // TODO: Verificar se é admin
    const companies = await db.prisma.company.findMany({
      select: {
        id: true,
        name: true,
        subdomain: true,
        domain: true,
        active: true,
        createdAt: true
      },
      orderBy: { createdAt: 'desc' }
    });
    
    return res.json({
      success: true,
      data: { companies }
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Erro ao listar empresas'
    });
  }
});

module.exports = router;


