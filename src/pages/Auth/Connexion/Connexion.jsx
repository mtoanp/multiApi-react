import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../../contexts/AuthContext'; // Import the useAuth hook
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Connexion = () => {
    const { setIsAuthenticated, setUserName } = useAuth(); // Use the authentication context
    const [utilisateur, setUtilisateur] = useState({
        email: '',
        motDePasse: ''
    });
    const navigate = useNavigate(); // Initialize useNavigate

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUtilisateur({
            ...utilisateur,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
      
        try {
          const response = await axios.post('http://localhost:3001/auth/connexion', {
            email: utilisateur.email,
            mot_de_passe: utilisateur.motDePasse
          });
      
          console.log("Afficher les détails de la connexion", response.data);
          setIsAuthenticated(true);
          setUserName(response.data.nom_utilisateur);
      
          // Stocker l'ID et le nom de l'utilisateur dans le localStorage
          localStorage.setItem('userId', response.data.id);
          localStorage.setItem('userName', response.data.nom_utilisateur);
          localStorage.setItem('isAuthenticated', 'true');
      
          setUtilisateur({ email: '', motDePasse: '' });
          navigate('/');
          console.log("ID utilisateur", response.data.id); // Pour vérifier
        } catch (error) {
          console.error(error);
        }
      };
    

    return (
        <div>
            <h2>Connexion</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={utilisateur.email}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Mot de passe:</label>
                    <input
                        type="password"
                        name="motDePasse"
                        value={utilisateur.motDePasse}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit">Se connecter</button>
            </form>
        </div>
    );
};

export default Connexion;
