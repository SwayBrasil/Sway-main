# Dockerfile para SWAY - Container único (frontend + backend)
FROM node:18-alpine

WORKDIR /app

# Instalar dependências globais
RUN npm install -g nodemon prisma

# Copiar package files do backend
COPY backend/package*.json ./backend/

# Instalar dependências do backend
WORKDIR /app/backend
RUN npm install

# Copiar código do backend
WORKDIR /app
COPY backend/ ./backend/

# Copiar frontend
COPY frontend/ ./frontend/

# Build do frontend React
WORKDIR /app/frontend
RUN npm install
RUN npm run build

# Gerar Prisma Client
WORKDIR /app/backend
RUN npx prisma generate

# Expor porta
EXPOSE 3000

# Variáveis de ambiente
ENV NODE_ENV=development
ENV PORT=3000

# Comando para desenvolvimento (com nodemon)
WORKDIR /app/backend
CMD ["npm", "run", "dev"]

