// Seed script para popular banco de dados inicial
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Iniciando seed do banco de dados...');

  // Criar usuário admin
  const hashedPassword = await bcrypt.hash('admin123', 10);
  
  const admin = await prisma.user.upsert({
    where: { email: 'admin@swaybrasil.com' },
    update: {},
    create: {
      name: 'Administrador',
      email: 'admin@swaybrasil.com',
      password: hashedPassword,
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

