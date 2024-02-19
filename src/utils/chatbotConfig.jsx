import { createChatBotMessage } from 'react-chatbot-kit';

const botName = "Bot";

const config = {
  initialMessages: [createChatBotMessage(`Bonjour! Je suis ${botName}. Comment puis-je vous aider ?`)],
  botName: botName,
  widgets: [
    {
      widgetName: 'authMessage',
      widgetFunc: (props) => {
        const { isAuthenticated } = props;

        if (isAuthenticated) {
          return (
            <div>Vous êtes connecté au chatbot. Posez vos questions.</div>
          );
        } else {
          return (
            <div>Veuillez vous connecter pour utiliser le chatbot.</div>
          );
        }
      },
    },
  ],
};

export default config;
