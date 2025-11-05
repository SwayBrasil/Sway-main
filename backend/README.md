# Backend SWAY - Node.js API

Backend completo com autenticação JWT, cadastro, login e dashboard.

## 🚀 Início Rápido

### 1. Instalar dependências
```bash
npm install
```

### 2. Configurar variáveis de ambiente
```bash
cp .env.example .env
```

Edite o arquivo `.env` com suas configurações:
```env
PORT=3000
NODE_ENV=development
JWT_SECRET=sua-chave-secreta-super-segura
JWT_EXPIRES_IN=7d
DATABASE_URL=sqlite:./database.sqlite
CORS_ORIGIN=http://localhost:8000
FRONTEND_URL=http://localhost:8000
```

### 3. Executar servidor
```bash
# Desenvolvimento (com auto-reload)
npm run dev

# Produção
npm start
```

O servidor estará rodando em: `http://localhost:3000`

## 📁 Estrutura

```
backend/
├── src/
│   ├── config/          # Configurações (database, auth)
│   ├── controllers/     # Lógica de negócio
│   │   ├── authController.js
│   │   └── homeController.js
│   ├── middleware/      # Middlewares (auth, validation)
│   │   └── auth.js
│   ├── models/         # Modelos de dados (quando usar ORM)
│   ├── routes/         # Rotas da API
│   │   ├── authRoutes.js
│   │   └── homeRoutes.js
│   ├── utils/          # Utilitários
│   │   ├── jwt.js
│   │   └── hash.js
│   └── server.js       # Arquivo principal
├── .env.example        # Exemplo de variáveis de ambiente
├── .gitignore
└── package.json
```

## 🔌 API Endpoints

### Autenticação (`/api/auth`)

#### POST `/api/auth/register`
Cadastro de novo usuário

**Request:**
```json
{
  "name": "João Silva",
  "email": "joao@example.com",
  "password": "senha123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Usuário cadastrado com sucesso",
  "data": {
    "user": {
      "id": 1,
      "name": "João Silva",
      "email": "joao@example.com"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

#### POST `/api/auth/login`
Login de usuário

**Request:**
```json
{
  "email": "joao@example.com",
  "password": "senha123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login realizado com sucesso",
  "data": {
    "user": {
      "id": 1,
      "name": "João Silva",
      "email": "joao@example.com"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

#### GET `/api/auth/me`
Buscar dados do usuário logado (requer autenticação)

**Headers:**
```
Authorization: Bearer {token}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": 1,
      "name": "João Silva",
      "email": "joao@example.com"
    }
  }
}
```

### Dashboard (`/api/home`)

#### GET `/api/home`
Dados do dashboard (requer autenticação)

**Headers:**
```
Authorization: Bearer {token}
```

**Response:**
```json
{
  "success": true,
  "message": "Dados do dashboard carregados com sucesso",
  "data": {
    "user": {
      "id": 1,
      "name": "João Silva",
      "email": "joao@example.com"
    },
    "stats": {
      "totalConversations": 0,
      "activeConversations": 0,
      "resolvedToday": 0,
      "pendingHandovers": 0
    },
    "recentActivity": [],
    "notifications": []
  }
}
```

### Health Check

#### GET `/health`
Verificar status do servidor

**Response:**
```json
{
  "success": true,
  "message": "SWAY Backend API is running",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

## 🔐 Autenticação

Todas as rotas protegidas requerem o header:
```
Authorization: Bearer {token}
```

O token é retornado no login e registro.

## 🗄️ Banco de Dados

✅ **PostgreSQL configurado com Prisma ORM**

### Setup Inicial

1. Instalar PostgreSQL localmente
2. Criar banco de dados: `createdb sway_db`
3. Configurar `.env` com `DATABASE_URL`
4. Executar migrations: `npm run db:migrate`
5. Popular banco (opcional): `npm run db:seed`

Veja `SETUP_DATABASE.md` para guia completo.

### Estrutura

- **users** - Usuários do sistema
- **conversations** - Conversas/atendimentos
- **activities** - Atividades do usuário
- **notifications** - Notificações

### Comandos

- `npm run db:generate` - Gerar Prisma Client
- `npm run db:migrate` - Criar/aplicar migrations
- `npm run db:studio` - Interface visual (http://localhost:5555)
- `npm run db:seed` - Popular banco com dados iniciais

## 🔧 Scripts

- `npm start` - Inicia servidor em produção
- `npm run dev` - Inicia servidor em desenvolvimento (com nodemon)

## 📝 Próximos Passos

- [ ] Implementar banco de dados real (Prisma/Sequelize)
- [ ] Adicionar validação de dados (express-validator)
- [ ] Implementar refresh tokens
- [ ] Adicionar rate limiting
- [ ] Implementar logs estruturados
- [ ] Adicionar testes unitários
- [ ] Docker setup
- [ ] Documentação Swagger/OpenAPI

## 🐛 Troubleshooting

### Porta já em uso
Altere a porta no `.env`:
```env
PORT=3001
```

### Erro de CORS
Adicione a URL do frontend no `.env`:
```env
CORS_ORIGIN=http://localhost:8000,https://swaybrasil.com
```

## 📞 Suporte

Para dúvidas ou problemas, entre em contato via WhatsApp ou email.

