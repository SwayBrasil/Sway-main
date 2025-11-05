# Landing Page - AI Agent

Uma landing page moderna para vender um agente de IA, com integração ao WhatsApp e analytics via Firebase.

## 🏗️ Estrutura do Projeto

O projeto está organizado para funcionar no GitHub Pages e preparado para futura implementação de backend:

```
├── index.html              # Página principal (GitHub Pages)
├── termos.html             # Termos de Uso
├── privacidade.html        # Política de Privacidade
├── public/                 # Assets do frontend
│   ├── assets/
│   │   ├── css/
│   │   ├── js/
│   │   └── img/
│   └── pages/
├── api/                    # Preparado para API REST
└── backend/                # Preparado para backend completo
```

Veja `PROJECT_STRUCTURE.md` para detalhes completos.

## 🚀 Configuração

### GitHub Pages (Atual)

1. Clone este repositório
2. Configure o domínio personalizado no arquivo `CNAME`
3. Ative o GitHub Pages nas configurações do repositório
4. O site estará disponível em `https://seu-dominio.com`

### Firebase (Opcional)

1. Crie um projeto no [Firebase Console](https://console.firebase.google.com)
2. Ative o Firebase Analytics
3. Copie as credenciais do seu projeto
4. Substitua as configurações no arquivo `api/config/firebase-config.js`

### WhatsApp

Todos os links já estão configurados com o número: `+55 (61) 98431-7466`

## 📊 Analytics Implementados

- Visualizações de página
- Cliques nos botões do WhatsApp
- Profundidade de scroll (25%, 50%, 75%, 100%)
- Tempo gasto na página
- Engajamento (>30s)
- Visualização de seções
- Expansão de FAQ

## 🎨 Personalização

- Altere as cores no arquivo `public/assets/css/styles.css`
- Modifique os textos no `index.html`
- Adicione ou remova seções conforme necessário

## 🔮 Futuro Backend

A estrutura está preparada para implementação futura:

- **API Routes** (`api/`): Para formulários, leads, analytics
- **Backend** (`backend/`): Para servidor completo, dashboard, autenticação

Os paths são relativos e manterão compatibilidade quando o backend for implementado.

## 📄 Páginas Legais

- `/termos.html` - Termos de Uso
- `/privacidade.html` - Política de Privacidade (LGPD)

## 🔗 Links

- Website: [swaybrasil.com](https://swaybrasil.com)
- Instagram: [@sway_brasil](https://www.instagram.com/sway_brasil/)
- WhatsApp: [Falar com vendas](https://api.whatsapp.com/send/?phone=556198431746)

## 📞 Suporte

Para suporte ou dúvidas, entre em contato via WhatsApp através dos botões na landing page.
