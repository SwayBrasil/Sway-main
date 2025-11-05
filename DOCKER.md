# 🐳 Docker Setup - SWAY

Guia completo para rodar o projeto SWAY com Docker.

---

## 📋 Pré-requisitos

- Docker instalado ([Docker Desktop](https://www.docker.com/products/docker-desktop))
- Docker Compose (vem com Docker Desktop)

---

## 🚀 Início Rápido

### Desenvolvimento

```bash
# Subir containers (backend + frontend + PostgreSQL)
docker-compose -f docker-compose.dev.yml up

# Ou em background
docker-compose -f docker-compose.dev.yml up -d

# Ver logs
docker-compose -f docker-compose.dev.yml logs -f

# Parar containers
docker-compose -f docker-compose.dev.yml down
```

**Acesso:**
- Frontend + Backend: `http://localhost:3000`
- API: `http://localhost:3000/api`
- PostgreSQL: `localhost:5432`

### Produção

```bash
# Build e subir
docker-compose up --build

# Ou em background
docker-compose up -d --build

# Parar
docker-compose down
```

---

## 📁 Estrutura Docker

```
Sway-main/
├── Dockerfile              # Produção (otimizado)
├── Dockerfile.dev          # Desenvolvimento (hot reload)
├── docker-compose.yml      # Produção
├── docker-compose.dev.yml  # Desenvolvimento
└── .dockerignore          # Arquivos ignorados
```

---

## 🔧 Configuração

### Variáveis de Ambiente

Criar arquivo `.env` na raiz:

```env
# Database
DATABASE_URL=postgresql://postgres:postgres@db:5432/sway_db

# JWT
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRES_IN=7d

# Server
PORT=3000
NODE_ENV=production

# CORS
CORS_ORIGIN=http://localhost:3000,https://swaybrasil.com
```

### Database

O PostgreSQL roda em um container separado e é iniciado automaticamente.

**Credenciais padrão:**
- User: `postgres`
- Password: `postgres`
- Database: `sway_db`
- Port: `5432`

---

## 🗄️ Setup do Banco de Dados

### Primeira vez

```bash
# 1. Subir containers
docker-compose -f docker-compose.dev.yml up -d

# 2. Executar migrations
docker-compose -f docker-compose.dev.yml exec sway npx prisma migrate dev

# 3. Popular banco (opcional)
docker-compose -f docker-compose.dev.yml exec sway npm run db:seed
```

### Acessar Prisma Studio

```bash
docker-compose -f docker-compose.dev.yml exec sway npx prisma studio
```

Abre em: `http://localhost:5555`

---

## 📦 Container Único

O projeto usa **um único container** que serve:
- ✅ Backend API (Express)
- ✅ Frontend estático (HTML/CSS/JS)
- ✅ Todos os assets

**Arquitetura:**
```
Container Sway
├── Backend (Express) → Porta 3000
├── Frontend (Static) → Servido pelo Express
└── PostgreSQL → Container separado
```

---

## 🔄 Comandos Úteis

### Desenvolvimento

```bash
# Subir tudo
docker-compose -f docker-compose.dev.yml up

# Rebuild após mudanças
docker-compose -f docker-compose.dev.yml up --build

# Ver logs do backend
docker-compose -f docker-compose.dev.yml logs -f sway

# Executar comando no container
docker-compose -f docker-compose.dev.yml exec sway npm run db:migrate

# Acessar shell do container
docker-compose -f docker-compose.dev.yml exec sway sh
```

### Produção

```bash
# Build e subir
docker-compose up --build -d

# Ver logs
docker-compose logs -f

# Parar e remover volumes
docker-compose down -v

# Rebuild completo
docker-compose down
docker-compose build --no-cache
docker-compose up -d
```

---

## 🗄️ Banco de Dados

### Backup

```bash
# Backup
docker-compose exec db pg_dump -U postgres sway_db > backup.sql

# Restore
docker-compose exec -T db psql -U postgres sway_db < backup.sql
```

### Reset Banco

```bash
# Parar e remover volume
docker-compose down -v

# Subir novamente
docker-compose up -d

# Executar migrations
docker-compose exec sway npx prisma migrate dev
```

---

## 🔍 Troubleshooting

### Porta já em uso

```bash
# Ver o que está usando a porta
lsof -i :3000

# Ou mudar porta no docker-compose.yml
ports:
  - "3001:3000"  # Muda porta externa
```

### Container não inicia

```bash
# Ver logs
docker-compose logs sway

# Rebuild sem cache
docker-compose build --no-cache

# Verificar variáveis de ambiente
docker-compose config
```

### Banco não conecta

```bash
# Verificar se PostgreSQL está rodando
docker-compose ps db

# Ver logs do banco
docker-compose logs db

# Testar conexão
docker-compose exec db psql -U postgres -d sway_db
```

### Prisma não funciona

```bash
# Gerar Prisma Client
docker-compose exec sway npx prisma generate

# Executar migrations
docker-compose exec sway npx prisma migrate dev
```

---

## 🚀 Deploy

### Build para produção

```bash
# Build image
docker build -t sway-app:latest .

# Tag para registry
docker tag sway-app:latest registry.example.com/sway-app:latest

# Push
docker push registry.example.com/sway-app:latest
```

### Deploy em servidor

```bash
# No servidor
docker-compose pull
docker-compose up -d --build
```

---

## 📊 Estrutura de Containers

```
┌─────────────────────┐
│   Container: sway   │
│                     │
│  ┌───────────────┐  │
│  │   Backend     │  │
│  │   (Express)   │  │
│  └───────┬───────┘  │
│          │           │
│  ┌───────▼───────┐  │
│  │   Frontend    │  │
│  │   (Static)    │  │
│  └───────────────┘  │
│                     │
│  Porta: 3000        │
└──────────┬──────────┘
           │
           │ HTTP
           │
┌──────────▼──────────┐
│  Container: db      │
│  PostgreSQL         │
│  Porta: 5432        │
└─────────────────────┘
```

---

## ✅ Checklist de Setup

- [ ] Docker instalado
- [ ] Arquivo `.env` configurado
- [ ] Containers subindo: `docker-compose ps`
- [ ] Backend respondendo: `curl http://localhost:3000/health`
- [ ] Frontend acessível: `http://localhost:3000`
- [ ] Banco conectado: migrations executadas
- [ ] Prisma Studio funcionando

---

## 📝 Notas

- **Hot Reload:** Em desenvolvimento, mudanças no código são refletidas automaticamente
- **Volumes:** Código é montado como volume para desenvolvimento
- **Produção:** Código é copiado para imagem (otimizado)
- **Database:** PostgreSQL roda em container separado para persistência

---

**Última atualização:** Novembro 2024

