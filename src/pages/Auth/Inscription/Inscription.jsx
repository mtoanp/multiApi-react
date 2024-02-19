
import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; 

const Inscription = () => {
    const [utilisateur, setUtilisateur] = useState({
        nom_utilisateur: '',
        email: '',
        mot_de_passe: ''
    });
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUtilisateur({
            ...utilisateur,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage('');

        try {
            const response = await axios.post('http://localhost:3001/auth/inscription', utilisateur);
            console.log(response.data);
            setUtilisateur({ nom_utilisateur: '', email: '', mot_de_passe: '' });
            // Redirect or show success message
        } catch (error) {
            if (error.response && error.response.status === 409) {
                setErrorMessage("Cet email est déjà utilisé. Veuillez essayer un autre email.");
            } else {
                console.error(error);
                setErrorMessage("Une erreur s'est produite lors de l'inscription.");
            }
        }
    };

    return (
        <div>
            <h2>Inscription</h2>
            {errorMessage && <div className="error-message">{errorMessage}</div>}

            <form onSubmit={handleSubmit}>
                <div>
                    <label>Nom:</label>
                    <input
                        type="text"
                        name="nom_utilisateur"
                        value={utilisateur.nom_utilisateur}
                        onChange={handleChange}
                    />
                </div>
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
                        name="mot_de_passe"
                        value={utilisateur.mot_de_passe}
                        onChange={handleChange}
                    />
                </div>
                {errorMessage && <div className="error-message">{errorMessage}</div>}
                <button type="submit">S'inscrire</button>
            </form>
            <div className="password-reset">
            <Link to="/reset-password">Mot de passe oublié?</Link> 
            </div>
        </div>
    );
};

export default Inscription;
