import React, { useState, useEffect } from 'react';
import Draggable from 'react-draggable';
import Chatbot from 'react-chatbot-kit';
import 'react-chatbot-kit/build/main.css';
import { useAuth } from '../../contexts/AuthContext';
import config from '../../utils/chatbotConfig';
import MessageParser from '../../utils/MessageParser';
import ActionProvider from '../../utils/ActionProvider';
import './ChatbotComponent.scss';
import clickSound from '../../assets/sounds/chatbot.mp3';
import gifPath from '../../assets/images/chatbot-unscreen.gif';
import pngPath from '../../assets/images/chatbot.png';

const ChatbotComponent = () => {
  const { isAuthenticated } = useAuth();
  const [collapse, setCollapse] = useState(true);
  const [showGif, setShowGif] = useState(true);

  const audio = new Audio(clickSound);

  // Fonction pour jouer le son
  const playSound = () => {
    audio.play();
  };

  const handleCollapse = () => {
    const newCollapseState = !collapse;
    setCollapse(newCollapseState);

    // Réinitialiser l'affichage du GIF à chaque ouverture
    if (!newCollapseState) {
      setShowGif(true);
      playSound();

      // Définir un délai pour changer le GIF en PNG après 3 secondes
      setTimeout(() => {
        setShowGif(false);
      }, 1800);
    }

    let chatbot = document.querySelector('.draggable-chatbot-container');
    let chatControl = document.querySelector('#chat-control');

    if (newCollapseState) {
      chatbot.style.height = '125px';
      // chatbot.style.height = '25px';
      chatControl.classList.remove('bi-chevron-down');
      chatControl.classList.add('bi-chevron-up');
    } else {
      chatbot.style.height = '580px';
      chatControl.classList.remove('bi-chevron-up');
      chatControl.classList.add('bi-chevron-down');
    }
  };



  return (
    <Draggable>
      <div className="draggable-chatbot-container">
        <div className="chatbot-window">
          <div className="chatbot-header" onClick={handleCollapse}>
            <div className="walking-man" style={{ backgroundImage: `url(${showGif ? gifPath : pngPath})` }}></div>
            <div className="chatbot-toggle btn">
              {collapse ? <i id="chat-control" className="bi bi-chevron-up"></i> : <i id="chat-control" className="bi bi-chevron-down"></i>}
            </div>
          </div>
          <div className="chatbot-content">
            {isAuthenticated ? (
              <Chatbot config={config} messageParser={MessageParser} actionProvider={ActionProvider} />
            ) : (
              <div>Veuillez vous connecter pour utiliser le chatbot.</div>
            )}
          </div>
        </div>
      </div>
    </Draggable>
  );
};

export default ChatbotComponent;
