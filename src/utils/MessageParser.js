class MessageParser {
  constructor(actionProvider) {
    this.actionProvider = actionProvider;
  }

  parse(message) {
    // Envoie chaque message de l'utilisateur au serveur backend
    this.actionProvider.handleMessage(message);
  }
}

export default MessageParser;
