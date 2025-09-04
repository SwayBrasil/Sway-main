# Landing Page - AI Agent

Uma landing page moderna para vender um agente de IA, com integração ao WhatsApp e analytics via Firebase.

## Configuração

1. Clone este repositório
2. Configure o Firebase:
   - Crie um projeto no [Firebase Console](https://console.firebase.google.com)
   - Ative o Firebase Analytics
   - Copie as credenciais do seu projeto
   - Substitua as configurações no arquivo `firebase-config.js`

3. Configure o WhatsApp:
   - Substitua "SEUNUMERO" nos links do WhatsApp pelo seu número no formato internacional (ex: 5511999999999)

## Estrutura do Projeto

- `index.html` - Estrutura principal da landing page
- `styles.css` - Estilos e layout responsivo
- `firebase-config.js` - Configuração do Firebase
- `app.js` - Lógica de interação e analytics

## Analytics Implementados

- Visualizações de página
- Cliques nos botões do WhatsApp
- Profundidade de scroll
- Tempo gasto na página

## Deploy no GitHub Pages

1. Crie um novo repositório no GitHub
2. Faça push do código para o repositório
3. Vá para Settings > Pages
4. Selecione a branch main como fonte
5. Seu site estará disponível em `https://seu-usuario.github.io/seu-repositorio`

## Personalização

- Altere as cores no arquivo `styles.css` (variáveis CSS no início do arquivo)
- Modifique os textos e preços no `index.html`
- Adicione ou remova seções conforme necessário

## Suporte

Para suporte ou dúvidas, entre em contato via WhatsApp através do botão na landing page. 