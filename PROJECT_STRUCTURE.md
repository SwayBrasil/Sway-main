# 🏗️ Estrutura do Projeto SWAY

## 📂 Organização Frontend/Backend

```
Sway-main/
│
├── 📁 frontend/              # Frontend completo
│   ├── 📁 src/               # Código-fonte
│   │   ├── 📁 assets/
│   │   │   ├── css/         # styles.css
│   │   │   ├── js/          # app.js
│   │   │   └── img/         # Imagens e favicons
│   │   └── 📁 pages/        # Páginas HTML
│   │       ├── index.html
│   │       ├── termos.html
│   │       └── privacidade.html
│   └── 📁 public/            # Build/dist (futuro)
│
├── 📁 backend/               # Backend completo
│   ├── 📁 src/               # Código-fonte do servidor
│   │   ├── config/           # Configurações (auth, database)
│   │   ├── controllers/       # Controllers (auth, home)
│   │   ├── middleware/        # Middleware (auth)
│   │   ├── routes/           # Rotas da API
│   │   └── utils/            # Utilitários (jwt, hash)
│   ├── 📁 prisma/            # Schema e migrations
│   ├── 📁 config/            # (vazio)
│   └── 📁 scripts/          # (vazio)
│
├── 📄 index.html             # Raiz (GitHub Pages)
├── 📄 termos.html            # Raiz (GitHub Pages)
├── 📄 privacidade.html       # Raiz (GitHub Pages)
├── 📄 CNAME                  # Domínio personalizado
└── 📄 README.md
```

## 🔄 Separação Frontend/Backend

### Frontend (`frontend/`)
- ✅ Todo código frontend isolado
- ✅ HTML, CSS, JavaScript
- ✅ Assets organizados
- ✅ Pronto para build process futuro

### Backend (`backend/`)
- ✅ Preparado para implementação
- ✅ Estrutura de pastas organizada
- ✅ Separado do frontend

### Backend (`backend/`)
- ✅ Servidor Express completo
- ✅ API REST estruturada
- ✅ PostgreSQL com Prisma ORM
- ✅ Autenticação JWT

## 🚀 GitHub Pages (Atual)

Os arquivos HTML na **raiz** apontam para `./frontend/src/assets/`:
- `index.html` → usa `./frontend/src/assets/`
- Funciona no GitHub Pages
- Paths relativos mantêm compatibilidade

## 🔮 Backend Implementado

O backend está completo e funcional:

### Opção 1: Servir Frontend Estático
```javascript
// backend/src/server.js
app.use(express.static('../frontend/src'));
```

### Opção 2: Build Process
```javascript
// Compilar frontend/src → frontend/public
// Servir frontend/public
app.use(express.static('../frontend/public'));
```

### Opção 3: Separado (Microserviços)
- Frontend: CDN ou servidor separado
- Backend: API apenas
- Comunicação via REST/GraphQL

## 📝 Paths Relativos

### GitHub Pages (Raiz)
```html
<script src="./frontend/src/assets/js/app.js"></script>
<img src="./frontend/src/assets/img/logo.png">
```

### Backend (Servindo frontend/src)
```html
<script src="./assets/js/app.js"></script>
<img src="./assets/img/logo.png">
```

## ✅ Vantagens desta Estrutura

1. **Separação clara** - Frontend e backend isolados
2. **GitHub Pages** - Continua funcionando
3. **Escalável** - Fácil adicionar build process
4. **Organizado** - Cada parte tem seu lugar
5. **Flexível** - Pode migrar para qualquer stack

## 🎯 Próximos Passos

1. ✅ Estrutura criada
2. ⏳ Implementar build process (opcional)
3. ⏳ Implementar backend
4. ⏳ Integrar frontend + backend

