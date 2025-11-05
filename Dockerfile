# Dockerfile para SWAY - Container único (frontend + backend)
FROM node:18-alpine

WORKDIR /app

# Instalar dependências do backend
COPY backend/package*.json ./backend/
WORKDIR /app/backend
RUN npm ci --only=production

# Copiar código do backend
COPY backend/ ./

# Gerar Prisma Client
RUN npx prisma generate

# Voltar para raiz e copiar frontend
WORKDIR /app
COPY frontend/ ./frontend/

# Expor porta
EXPOSE 3000

# Variáveis de ambiente
ENV NODE_ENV=production
ENV PORT=3000

# Comando para iniciar servidor
WORKDIR /app/backend
CMD ["node", "src/server.js"]

