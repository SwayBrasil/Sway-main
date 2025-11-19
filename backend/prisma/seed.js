// Seed script para popular banco de dados inicial
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Iniciando seed do banco de dados...');

  // Criar company padrão (para desenvolvimento/teste)
  const defaultCompany = await prisma.company.upsert({
    where: { subdomain: 'demo' },
    update: {},
    create: {
      name: 'Empresa Demo',
      subdomain: 'demo',
      domain: 'demo.swaybrasil.com',
      active: true
    },
  });

  console.log('✅ Company demo criada:', defaultCompany.subdomain);

  // Criar usuário admin
  const hashedPassword = await bcrypt.hash('admin123', 10);
  
  const admin = await prisma.user.upsert({
    where: { email: 'admin@swaybrasil.com' },
    update: {
      companyId: defaultCompany.id
    },
    create: {
      name: 'Administrador',
      email: 'admin@swaybrasil.com',
      password: hashedPassword,
      companyId: defaultCompany.id,
    },
  });

  console.log('✅ Usuário admin criado:', admin.email);

  // Criar algumas atividades de exemplo
  await prisma.activity.create({
    data: {
      userId: admin.id,
      type: 'system',
      message: 'Sistema inicializado'
    }
  });

  // Criar algumas notificações de exemplo
  await prisma.notification.create({
    data: {
      userId: admin.id,
      type: 'info',
      message: 'Bem-vindo à plataforma SWAY!'
    }
  });

  console.log('✅ Seed concluído!');
}

main()
  .catch((e) => {
    console.error('❌ Erro no seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

