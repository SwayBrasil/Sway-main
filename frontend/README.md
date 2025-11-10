# SWAY Frontend - React

Frontend React do projeto SWAY com Vite, React Router e Tailwind CSS.

## 🚀 Início Rápido

### Instalar dependências

```bash
npm install
```

### Desenvolvimento

```bash
npm run dev
```

Acesse: http://localhost:5173

### Build para produção

```bash
npm run build
```

### Preview da build

```bash
npm run preview
```

## 📁 Estrutura

```
frontend/
├── public/
│   └── assets/
│       └── img/          # Imagens
├── src/
│   ├── components/       # Componentes React
│   ├── contexts/         # Context API (Auth)
│   ├── pages/            # Páginas
│   ├── App.jsx           # App principal
│   ├── main.jsx          # Entry point
│   └── index.css         # Estilos globais
├── package.json
└── vite.config.js
```

## 🔧 Tecnologias

- **React 18** - Biblioteca UI
- **Vite** - Build tool
- **React Router** - Roteamento
- **Tailwind CSS** - Estilização
- **Axios** - HTTP client

## 🌐 Variáveis de Ambiente

Criar `.env`:

```env
VITE_API_URL=http://localhost:3000/api
```

## 📝 Páginas

- `/` - Landing page
- `/login` - Login
- `/register` - Cadastro
- `/home` - Dashboard (protegido)
- `/termos` - Termos de Uso
- `/privacidade` - Política de Privacidade

## 🔐 Autenticação

O frontend usa Context API para gerenciar autenticação:

```jsx
import { useAuth } from './contexts/AuthContext'

const { user, login, logout, isAuthenticated } = useAuth()
```

## 🎨 Tailwind CSS

Configurado com cores personalizadas:

- `primary-*` - Cores primárias da marca
- `shadow-soft` - Sombra suave

## 📦 Build

O build gera arquivos em `dist/` que podem ser servidos estaticamente ou integrados ao backend.
