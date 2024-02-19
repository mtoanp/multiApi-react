class ActionProvider {
  constructor(createChatBotMessage, setStateFunc, createCustomMessage) {
    this.createChatBotMessage = createChatBotMessage;
    this.setState = setStateFunc;
    this.createCustomMessage = createCustomMessage;
  }

  // Méthode pour envoyer un message à votre serveur backend
  async handleMessage(message) {
    try {
      const response = await fetch('http://localhost:3001/chatbot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      });

      const data = await response.json();

      if (data.reply) {
        const botMessage = this.createChatBotMessage(data.reply);
        this.updateChatbotState(botMessage);
      } else {
        const errorMessage = this.createChatBotMessage("Je n'ai pas pu obtenir de réponse. Réessayez plus tard.");
        this.updateChatbotState(errorMessage);
      }
    } catch (error) {
      console.error('Erreur lors de la communication avec le serveur backend:', error);
      const errorMessage = this.createChatBotMessage("j'ai payer 7$10 pour activée l'api maisq il faut attendre 24 heurs "); // Message d'erreur
      this.updateChatbotState(errorMessage);
    }
  }

  // Méthode pour mettre à jour l'état du chatbot
  updateChatbotState(message) {
    this.setState(prevState => ({
      ...prevState,
      messages: [...prevState.messages, message],
    }));
  }
}

export default ActionProvider;
