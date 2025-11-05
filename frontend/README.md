# Frontend SWAY

Frontend completo da landing page SWAY, organizado e pronto para desenvolvimento.

## 📁 Estrutura

```
frontend/
├── src/                    # Código-fonte do frontend
│   ├── assets/
│   │   ├── css/           # Estilos CSS
│   │   ├── js/            # JavaScript
│   │   └── img/           # Imagens e favicons
│   └── pages/             # Páginas HTML (termos, privacidade)
│       ├── index.html     # Página principal
│       ├── termos.html
│       └── privacidade.html
└── public/                 # Build/dist (quando implementar build process)
```

## 🚀 GitHub Pages

Para manter compatibilidade com GitHub Pages, os arquivos HTML principais também estão na **raiz** do projeto, apontando para `./frontend/src/assets/`.

## 🛠️ Desenvolvimento

### Local
```bash
# Servidor simples
cd frontend/src
python3 -m http.server 8000

# Ou da raiz do projeto
python3 -m http.server 8000
# Acesse: http://localhost:8000
```

### Build (Futuro)
Quando implementar build process (Webpack, Vite, etc):
- `src/` → código-fonte
- `public/` ou `dist/` → arquivos compilados/otimizados

## 📦 Dependências

- **Tailwind CSS** - Via CDN (pode migrar para npm quando necessário)
- **Google Analytics** - Via gtag.js
- **JavaScript puro** - Sem frameworks (pode adicionar React/Vue/etc quando necessário)

## 🎯 Estrutura de Paths

Todos os paths são **relativos** para manter compatibilidade:
- `./assets/img/` - Imagens
- `./assets/js/app.js` - JavaScript
- `./termos.html` - Páginas

## 🔄 Migração para Backend

Quando o backend for implementado:
- `frontend/src/` pode ser servido diretamente pelo servidor
- Ou compilar para `frontend/public/` e servir de lá
- Backend em `../backend/` servirá a API

