# 🚀 Como Rodar o Projeto SWAY

Guia rápido para iniciar o projeto.

---

## 📋 Pré-requisitos

1. **Docker Desktop** instalado e rodando
   - macOS: [Download Docker Desktop](https://www.docker.com/products/docker-desktop)
   - Verificar: `docker ps` deve funcionar

2. **PostgreSQL** (opcional, se rodar sem Docker)
   - Ou usar o container PostgreSQL do Docker

---

## 🐳 Opção 1: Docker (Recomendado)

### Passo 1: Iniciar Docker Desktop

Certifique-se de que o Docker Desktop está rodando:
- macOS: Abrir Docker Desktop app
- Verificar: `docker ps` deve retornar sem erros

### Passo 2: Subir os containers

```bash
# Desenvolvimento (com hot reload)
docker-compose -f docker-compose.dev.yml up --build

# Ou em background
docker-compose -f docker-compose.dev.yml up --build -d
```

### Passo 3: Configurar banco de dados

```bash
# Executar migrations (primeira vez)
docker-compose -f docker-compose.dev.yml exec sway npx prisma migrate dev

# Popular banco (opcional)
docker-compose -f docker-compose.dev.yml exec sway npm run db:seed
```

### Passo 4: Acessar

- **Frontend:** http://localhost:3000
- **API:** http://localhost:3000/api
- **Health Check:** http://localhost:3000/health
- **Prisma Studio:** http://localhost:5555 (se abrir)

---

## 💻 Opção 2: Local (Sem Docker)

### Passo 1: Instalar dependências

```bash
cd backend
npm install
```

### Passo 2: Configurar PostgreSQL

```bash
# Criar banco
createdb sway_db

# Configurar .env
cp env.example .env
# Editar .env com suas credenciais
```

### Passo 3: Configurar banco

```bash
# Gerar Prisma Client
npm run db:generate

# Executar migrations
npm run db:migrate

# Popular banco (opcional)
npm run db:seed
```

### Passo 4: Iniciar servidor

```bash
# Desenvolvimento
npm run dev

# Produção
npm start
```

### Passo 5: Acessar

- **Frontend:** http://localhost:3000
- **API:** http://localhost:3000/api

---

## 🔧 Comandos Úteis

### Docker

```bash
# Ver logs
docker-compose -f docker-compose.dev.yml logs -f

# Parar containers
docker-compose -f docker-compose.dev.yml down

# Rebuild após mudanças
docker-compose -f docker-compose.dev.yml up --build

# Acessar shell do container
docker-compose -f docker-compose.dev.yml exec sway sh

# Prisma Studio
docker-compose -f docker-compose.dev.yml exec sway npx prisma studio
```

### Local

```bash
# Ver logs do backend
cd backend && npm run dev

# Prisma Studio
cd backend && npm run db:studio

# Executar migrations
cd backend && npm run db:migrate
```

---

## 🐛 Troubleshooting

### Docker não inicia

```bash
# Verificar se Docker Desktop está rodando
docker ps

# Se não funcionar, iniciar Docker Desktop manualmente
```

### Erro de conexão com banco

```bash
# Verificar se PostgreSQL está rodando
docker-compose -f docker-compose.dev.yml ps db

# Ver logs do banco
docker-compose -f docker-compose.dev.yml logs db

# Aguardar banco ficar saudável
docker-compose -f docker-compose.dev.yml up db
```

### Porta 3000 já em uso

```bash
# Ver o que está usando
lsof -i :3000

# Mudar porta no docker-compose.dev.yml
ports:
  - "3001:3000"  # Muda porta externa
```

### Erro "Prisma Client not generated"

```bash
# Gerar Prisma Client
docker-compose -f docker-compose.dev.yml exec sway npx prisma generate

# Ou localmente
cd backend && npm run db:generate
```

---

## ✅ Checklist de Setup

- [ ] Docker Desktop instalado e rodando
- [ ] Containers subindo: `docker-compose ps`
- [ ] Backend respondendo: `curl http://localhost:3000/health`
- [ ] Frontend acessível: `http://localhost:3000`
- [ ] Banco conectado: migrations executadas
- [ ] Prisma Studio funcionando (opcional)

---

## 🎯 Próximos Passos

1. Acessar http://localhost:3000
2. Testar cadastro de usuário
3. Testar login
4. Acessar dashboard

---

**Última atualização:** Novembro 2024

