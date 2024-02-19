import React, { useState, useEffect } from 'react';
import axios from 'axios';
import socketIOClient from 'socket.io-client';
import ChatModal from './ChatModal';
import './Chat.scss';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [users, setUsers] = useState([]);
  const socket = socketIOClient('http://localhost:3001');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const userId = localStorage.getItem('userId');

  const addMessage = (message) => {
    setMessages(currentMessages => [...currentMessages, message]);
  };

  const handleSendMessage = async () => {
    if (newMessage.trim()) {
      try {
        await axios.post('http://localhost:3001/api/send-message', {
          sender_id: userId,
          receiver_id: selectedUser.id,
          message: newMessage
        });

        addMessage(newMessage);
        setNewMessage('');
      } catch (error) {
        console.error("Erreur lors de l'envoi du message", error);
      }
    }
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/users');
        setUsers(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des utilisateurs", error);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    socket.on('message', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const openChatModal = async (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);

    try {
      const response = await axios.get(`http://localhost:3001/api/messages/${userId}/${user.id}`);
      setMessages(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération de l'historique des messages", error);
    }
  };
 
  return (
    <div>
      <div>
        <h2>Chat en direct</h2>
        <div className="chat-container">
          {messages.map((message, index) => (
            <div key={index}>{message}</div>
          ))}
        </div>
        <input
          type="text"
          placeholder="Entrez votre message"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button onClick={handleSendMessage}>Envoyer</button>
      </div>
      <div>
        <h2>Utilisateurs connectés</h2>
        <ul>
          {users.map((user) => (
            <li key={user.id} onClick={() => openChatModal(user)}>
              {user.nom_utilisateur} - {user.email}
            </li>
          ))}
        </ul>
      </div>

      {isModalOpen && (
        <ChatModal 
          onClose={() => setIsModalOpen(false)}
          user={selectedUser}
          userId={userId}
          onSendMessage={addMessage}
        />
      )}
    </div>
  );
};

export default Chat;
