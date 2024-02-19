import React, { useRef, useState, useEffect } from 'react';
import emailjs from 'emailjs-com';
import './Contact.scss';
import { FaLinkedinIn, FaWhatsapp, FaInstagram, FaEnvelope, FaTwitter, FaGithub } from 'react-icons/fa'; 


function ContactForm() {
  const form = useRef();
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Initialisation d'EmailJS avec la clé publique
    emailjs.init(import.meta.env.VITE_REACT_APP_EMAILJS_USER_ID);

    emailjs.sendForm(
      import.meta.env.VITE_REACT_APP_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_REACT_APP_EMAILJS_TEMPLATE_ID,
      form.current
    )
    .then((result) => {
        setMessage('Votre message a été envoyé avec succès.');
        setIsError(false);
        setIsLoading(false);
        form.current.reset();
        setTimeout(() => setMessage(''), 5000); // Efface le message après 5 secondes
    }, (error) => {
        setMessage(`Une erreur s'est produite lors de l'envoi: ${error.text}`);
        setIsError(true);
        setIsLoading(false);
        setTimeout(() => setMessage(''), 5000); // Efface le message après 5 secondes
    });
  };
  const socialMediaLinks = {
    linkedIn: "https://www.linkedin.com/in/votreprofil/",
    whatsApp: "https://wa.me/votrenumero",
    email: "mailto:votreadressemail@example.com",
    instagram: "https://www.instagram.com/votreprofil/",
    twitter: "https://twitter.com/votreprofil",
    github: "https://github.com/Stinger1369"
};

  return (
    <div className="contact-container">
       
       <div className="contact-form-container">
      <form ref={form} onSubmit={sendEmail}>
        <div className="mb-3">
          <label htmlFor="user_name" className="form-label">Name</label>
          <input type="text" className="form-control" id="user_name" name="user_name" required />
        </div>
        <div className="mb-3">
          <label htmlFor="user_email" className="form-label">Email</label>
          <input type="email" className="form-control" id="user_email" name="user_email" required />
        </div>
        <div className="mb-3">
          <label htmlFor="message" className="form-label">Message</label>
          <textarea className="form-control" id="message" name="message" rows="3" required></textarea>
        </div>
        <button type="submit" className="btn btn-primary" disabled={isLoading}>
          {isLoading ? 'Sending...' : 'Send'}
        </button>
      </form>
      {message && (
        <div className={`message ${isError ? 'error' : 'success'}`}>
          {message}
        </div>
      )}
       </div>
       <div className="social-media-links">
                <a href={socialMediaLinks.linkedIn} target="_blank" rel="noopener noreferrer"><FaLinkedinIn /></a>
                <a href={socialMediaLinks.whatsApp} target="_blank" rel="noopener noreferrer"><FaWhatsapp /></a>
                <a href={socialMediaLinks.email}><FaEnvelope /></a>
                <a href={socialMediaLinks.instagram} target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
                <a href={socialMediaLinks.twitter} target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
                <a href={socialMediaLinks.github} target="_blank" rel="noopener noreferrer"><FaGithub /></a>

       </div>
    </div>
  );
}

export default ContactForm;
