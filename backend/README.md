# Backend SWAY - Node.js

Backend API para a plataforma SWAY, construído com Node.js e Express.

## 🚀 Início Rápido

### Pré-requisitos

- Node.js >= 18.0.0
- npm >= 9.0.0

### Instalação

```bash
# Instalar dependências
npm install

# Copiar arquivo de ambiente
cp .env.example .env

# Editar .env com suas configurações
```

### Executar

```bash
# Modo desenvolvimento (com hot-reload)
npm run dev

# Modo produção
npm start
```

O servidor estará rodando em `http://localhost:3000`

## 📁 Estrutura

```
backend/
├── src/
│   ├── server.js          # Servidor principal
│   ├── routes/            # Rotas da API
│   ├── middleware/        # Middlewares customizados
│   ├── config/            # Configurações (DB, etc)
│   └── utils/             # Utilitários
├── config/                # Configurações adicionais
├── scripts/               # Scripts de deploy/build
├── package.json
├── .env.example
└── .gitignore
```

## 🔧 Configuração

### Variáveis de Ambiente

Copie `.env.example` para `.env` e configure:

```env
NODE_ENV=development
PORT=3000
HOST=localhost
FRONTEND_URL=http://localhost:8000
```

### Banco de Dados (Futuro)

Quando implementar banco de dados, descomente e configure em `src/config/database.js`:

```env
# PostgreSQL
DATABASE_URL=postgresql://user:password@localhost:5432/sway

# ou MongoDB
MONGODB_URI=mongodb://localhost:27017/sway
```

## 📡 Endpoints da API

### Health Check
```
GET /health
```

### Contato
```
POST /api/contact
Body: { name, email, message }
```

### Lead
```
POST /api/lead
Body: { email, name, phone, source }
```

### Analytics
```
POST /api/analytics
Body: { event, data }
```

## 🛠️ Desenvolvimento

### Scripts Disponíveis

- `npm start` - Inicia servidor em produção
- `npm run dev` - Inicia servidor em desenvolvimento (com nodemon)

### Hot Reload

O `nodemon` está configurado para recarregar automaticamente quando arquivos mudarem.

## 🔒 Segurança

- **Helmet** - Headers de segurança
- **CORS** - Configurado para frontend
- **Rate Limiting** - Limite de 100 requisições por 15 minutos
- **Validação** - Middlewares de validação implementados

## 📦 Dependências Principais

- **express** - Framework web
- **cors** - Cross-Origin Resource Sharing
- **helmet** - Segurança HTTP
- **morgan** - Logging de requisições
- **dotenv** - Variáveis de ambiente
- **express-rate-limit** - Rate limiting

## 🚀 Deploy

### Produção

1. Configure variáveis de ambiente
2. Instale dependências: `npm install --production`
3. Inicie servidor: `npm start`

### Variáveis de Produção

```env
NODE_ENV=production
PORT=3000
FRONTEND_URL=https://swaybrasil.com
```

## 📝 Próximos Passos

1. ✅ Setup básico criado
2. ⏳ Implementar banco de dados
3. ⏳ Implementar autenticação (JWT)
4. ⏳ Integração com WhatsApp API
5. ⏳ Integração com CRM
6. ⏳ Sistema de email
7. ⏳ Analytics completo

## 🤝 Integração com Frontend

O backend serve o frontend estático em produção:

```javascript
// frontend em: ../frontend/src/
app.use(express.static(frontendPath));
```

## 📞 Suporte

Para dúvidas ou problemas, entre em contato via WhatsApp ou email.

