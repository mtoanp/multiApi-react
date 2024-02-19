import React, { useState } from 'react';
import axios from 'axios';

const ResetPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        setEmail(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');

        try {
            const response = await axios.post('http://localhost:3001/auth/reset-password', { email: email });
            setMessage('Un lien de réinitialisation du mot de passe a été envoyé à votre adresse email.');
        } catch (error) {
            console.error(error);
            setMessage("Une erreur s'est produite lors de la demande de réinitialisation du mot de passe.");
        }
    };

    return (
        <div>
            <h2>Réinitialiser le mot de passe</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={email}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit">Demander la réinitialisation</button>
            </form>
            {message && <div>{message}</div>}
        </div>
    );
};

export default ResetPassword;
