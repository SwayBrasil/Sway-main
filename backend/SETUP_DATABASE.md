# 🗄️ Setup PostgreSQL - SWAY Backend

Guia completo para configurar e usar PostgreSQL no backend.

---

## 📋 Pré-requisitos

1. **PostgreSQL instalado**
   - macOS: `brew install postgresql@14`
   - Linux: `sudo apt-get install postgresql`
   - Windows: [Download oficial](https://www.postgresql.org/download/)

2. **Node.js e npm** (já instalado)

---

## 🚀 Setup Inicial

### 1. Instalar dependências

```bash
cd backend
npm install
```

### 2. Criar banco de dados

```bash
# Iniciar PostgreSQL (se não estiver rodando)
# macOS
brew services start postgresql@14

# Linux
sudo systemctl start postgresql

# Criar banco de dados
createdb sway_db

# Ou via psql
psql -U postgres
CREATE DATABASE sway_db;
\q
```

### 3. Configurar variáveis de ambiente

```bash
# Copiar arquivo de exemplo
cp env.example .env

# Editar .env com suas credenciais
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/sway_db
```

**Formato do DATABASE_URL:**
```
postgresql://USER:PASSWORD@HOST:PORT/DATABASE
```

### 4. Gerar Prisma Client

```bash
npm run db:generate
```

### 5. Executar migrations

```bash
npm run db:migrate
```

Isso criará todas as tabelas no banco de dados.

### 6. Popular banco (opcional)

```bash
npm run db:seed
```

Isso criará um usuário admin:
- Email: `admin@swaybrasil.com`
- Senha: `admin123`

---

## 📊 Estrutura do Banco

### Tabelas criadas:

1. **users** - Usuários do sistema
   - id, name, email, password, createdAt, updatedAt

2. **conversations** - Conversas/atendimentos
   - id, userId, status, channel, createdAt, updatedAt

3. **activities** - Atividades do usuário
   - id, userId, type, message, createdAt

4. **notifications** - Notificações
   - id, userId, type, message, read, createdAt

---

## 🔧 Comandos Úteis

### Prisma Studio (Interface visual)
```bash
npm run db:studio
```
Abre interface web em `http://localhost:5555`

### Criar nova migration
```bash
# Após alterar schema.prisma
npm run db:migrate
```

### Resetar banco (CUIDADO!)
```bash
npx prisma migrate reset
```

### Verificar conexão
```bash
# No arquivo .env, testar conexão
psql $DATABASE_URL
```

---

## 🐛 Troubleshooting

### Erro: "Can't reach database server"
- Verificar se PostgreSQL está rodando
- Verificar credenciais no `.env`
- Verificar porta (padrão: 5432)

### Erro: "Database does not exist"
- Criar banco: `createdb sway_db`
- Ou criar manualmente via psql

### Erro: "relation does not exist"
- Executar migrations: `npm run db:migrate`
- Gerar Prisma Client: `npm run db:generate`

### Erro de conexão em produção
- Verificar variável `DATABASE_URL` no servidor
- Verificar firewall/security groups
- Verificar credenciais

---

## 🔄 Migrations

### Criar nova migration
```bash
# 1. Editar prisma/schema.prisma
# 2. Executar:
npm run db:migrate
# 3. Dar nome à migration quando solicitado
```

### Aplicar migrations em produção
```bash
# Em produção, usar:
npx prisma migrate deploy
```

---

## 📝 Exemplos de Uso

### No código (já implementado):

```javascript
// Buscar usuário
const user = await db.findUserByEmail('email@example.com');

// Criar usuário
const newUser = await db.createUser({
  name: 'João',
  email: 'joao@example.com',
  password: hashedPassword
});

// Buscar estatísticas
const stats = await db.getConversationStats(userId);
```

---

## 🔐 Segurança

### Boas práticas:

1. **Nunca commitar `.env`**
   - Já está no `.gitignore`

2. **Usar variáveis de ambiente em produção**
   - Não hardcodar credenciais

3. **Senhas sempre hasheadas**
   - Já implementado com bcrypt

4. **Conexões SSL em produção**
   ```
   DATABASE_URL=postgresql://user:pass@host:5432/db?sslmode=require
   ```

---

## 🚀 Deploy

### Heroku
```bash
# Heroku adiciona DATABASE_URL automaticamente
heroku addons:create heroku-postgresql
```

### Railway
```bash
# Railway também adiciona automaticamente
# Apenas conectar o banco no dashboard
```

### Vercel/Netlify
- Usar variável de ambiente `DATABASE_URL`
- Conectar banco externo (Supabase, Neon, etc.)

---

## 📚 Referências

- [Prisma Docs](https://www.prisma.io/docs)
- [PostgreSQL Docs](https://www.postgresql.org/docs/)
- [Prisma + PostgreSQL](https://www.prisma.io/docs/concepts/database-connectors/postgresql)

---

**Status:** ✅ PostgreSQL configurado e pronto para uso!

