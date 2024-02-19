import React, { useState } from 'react';
import axios from 'axios';
import './ChatModal.scss';

const ChatModal = ({  onClose, user, userId, onSendMessage }) => {
    const [newMessage, setNewMessage] = useState('');
    const [messages, setMessages] = useState([]);

  console.log("Utilisateur sélectionné :", user); // Pour débogage
  console.log("ID utilisateur :", userId); // Pour débogage
  console.log("Message :", newMessage); // Pour débogage
  console.log("Messages :", messages); // Pour débogage
  
    const sendMessage = async () => {
      if (newMessage.trim()) {
        console.log("Envoi du message :", newMessage); // Pour débogage
        try {
          const response = await axios.post('http://localhost:3001/api/send-message', {
            sender_id: userId,
            receiver_id: user.id,
            message: newMessage
          });
          console.log("Réponse du serveur :", response.data); // Pour débogage
  
          onSendMessage(newMessage);
          setNewMessage('');
          console.log("Message envoyé",newMessage ); // Pour débogage
        } catch (error) {
          console.error("Erreur lors de l'envoi du message", error);
        }
      }
    };

  if (!user) return null;

  return (
    <div className="chat-modal">
      <div className="chat-modal-content">
        <div className="chat-modal-header">
          <h3>Chat avec {user.nom_utilisateur}</h3>
          <span className="chat-modal-close-button" onClick={onClose}>&times;</span>
        </div>
        <div className="chat-modal-body">
          {messages.map((message, index) => (
            <p key={index}>{message}</p>
          ))}
        </div>
        <div className="chat-modal-footer">
        <input
          type="text"
          placeholder="Entrez votre message"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button onClick={sendMessage}>Envoyer</button>
      </div>
      </div>
    </div>
  );
};

export default ChatModal;
