// Script para criar usuário de teste
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Criando usuário de teste...');

  // Buscar ou criar company demo
  let company = await prisma.company.findUnique({
    where: { subdomain: 'demo' }
  });

  if (!company) {
    company = await prisma.company.create({
      data: {
        name: 'Empresa Demo',
        subdomain: 'demo',
        domain: 'demo.swaybrasil.com',
        active: true
      }
    });
    console.log('✅ Company demo criada');
  }

  // Hash da senha
  const hashedPassword = await bcrypt.hash('Test@mobi25', 10);

  // Criar ou atualizar usuário de teste
  const user = await prisma.user.upsert({
    where: { cpfCnpj: '12345678909' },
    update: {
      name: 'Usuário Teste',
      password: hashedPassword,
      companyId: company.id
    },
    create: {
      name: 'Usuário Teste',
      cpfCnpj: '12345678909',
      email: 'teste@swaybrasil.com',
      password: hashedPassword,
      provider: 'local',
      companyId: company.id
    }
  });

  console.log('✅ Usuário de teste criado:');
  console.log('   CPF/CNPJ: 12345678909');
  console.log('   Senha: Test@mobi25');
  console.log('   Company: ' + company.name);
}

main()
  .catch((e) => {
    console.error('❌ Erro:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });


