# Estrutura do Projeto SWAY

## 📁 Organização de Arquivos

```
Sway-main/
│
├── 📄 index.html              # Página principal (raiz para GitHub Pages)
├── 📄 termos.html              # Termos de Uso (raiz para GitHub Pages)
├── 📄 privacidade.html         # Política de Privacidade (raiz para GitHub Pages)
├── 📄 CNAME                    # Configuração de domínio personalizado
├── 📄 README.md                 # Documentação principal
│
├── 📁 public/                  # Frontend Assets
│   ├── 📁 assets/
│   │   ├── 📁 css/
│   │   │   └── styles.css
│   │   ├── 📁 js/
│   │   │   └── app.js          # Analytics e eventos
│   │   └── 📁 img/              # Imagens e favicons
│   │       ├── logo-sway.png
│   │       ├── favicon-32.png
│   │       ├── sway_logo-*.png
│   │       └── ...
│   └── 📁 pages/
│       ├── termos.html          # Backup/cópia
│       └── privacidade.html     # Backup/cópia
│
├── 📁 api/                     # Preparado para API REST futura
│   ├── 📁 config/
│   │   └── firebase-config.js
│   ├── 📁 controllers/
│   ├── 📁 middleware/
│   ├── 📁 models/
│   └── 📁 routes/
│
└── 📁 backend/                 # Preparado para backend completo
    ├── 📁 src/
    ├── 📁 config/
    └── 📁 scripts/
```

## 🔄 Compatibilidade GitHub Pages

Os arquivos HTML principais estão na **raiz** para funcionar no GitHub Pages:
- `index.html` → Aponta para `./public/assets/`
- `termos.html` → Aponta para `./public/assets/`
- `privacidade.html` → Aponta para `./public/assets/`

## 🚀 Futuro Backend

Quando o backend for implementado:

1. **API Routes** (`api/`):
   - Rotas REST para formulários, leads, analytics
   - Middleware de autenticação
   - Integração com banco de dados

2. **Backend Completo** (`backend/`):
   - Servidor Node.js/Python/PHP
   - Processamento de requisições
   - Dashboard administrativo

3. **Frontend** (`public/`):
   - Continua funcionando normalmente
   - Paths relativos mantêm compatibilidade
   - Pode ser servido pelo backend ou CDN

## 📝 Paths Relativos

Todos os paths são **relativos** para manter compatibilidade:
- `./public/assets/img/` - Imagens
- `./public/assets/js/app.js` - JavaScript
- `./termos.html` - Páginas

## ✅ Status Atual

- ✅ Estrutura organizada
- ✅ Compatível com GitHub Pages
- ✅ Preparado para backend futuro
- ✅ Paths relativos funcionando

