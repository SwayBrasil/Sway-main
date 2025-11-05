# Landing Page - AI Agent

Uma landing page moderna para vender um agente de IA, com integração ao WhatsApp e analytics via Firebase.

## 🏗️ Estrutura do Projeto

O projeto está organizado para funcionar no GitHub Pages e preparado para futura implementação de backend:

```
├── index.html              # Página principal (GitHub Pages)
├── termos.html             # Termos de Uso
├── privacidade.html        # Política de Privacidade
├── frontend/               # Frontend completo
│   ├── src/
│   │   ├── assets/
│   │   ├── pages/
│   │   └── index.html
│   └── public/
└── backend/                # Backend completo
```

Veja `PROJECT_STRUCTURE.md` para detalhes completos.

## 🚀 Configuração

### GitHub Pages (Atual)

1. Clone este repositório
2. Configure o domínio personalizado no arquivo `CNAME`
3. Ative o GitHub Pages nas configurações do repositório
4. O site estará disponível em `https://seu-dominio.com`

### Firebase (Opcional)

Atualmente usando Google Analytics. Para usar Firebase Analytics, você precisaria:
1. Criar um projeto no [Firebase Console](https://console.firebase.google.com)
2. Ativar o Firebase Analytics
3. Integrar no código conforme necessário

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

## 🔮 Backend

Backend completo já implementado:

- **Backend** (`backend/`): Servidor Express com autenticação JWT, PostgreSQL e Prisma ORM
- **API REST**: Endpoints para login, cadastro e dashboard
- **Banco de Dados**: PostgreSQL com modelos para usuários, conversas, atividades e notificações

Veja `backend/README.md` para documentação completa da API.

## 📄 Páginas Legais

- `/termos.html` - Termos de Uso
- `/privacidade.html` - Política de Privacidade (LGPD)

## 🔗 Links

- Website: [swaybrasil.com](https://swaybrasil.com)
- Instagram: [@sway_brasil](https://www.instagram.com/sway_brasil/)
- WhatsApp: [Falar com vendas](https://api.whatsapp.com/send/?phone=556198431746)

## 📞 Suporte

Para suporte ou dúvidas, entre em contato via WhatsApp através dos botões na landing page.
