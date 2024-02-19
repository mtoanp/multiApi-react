import React, { useEffect, useState } from 'react';
import './ExchangeRateStack.scss';
import Spinner from '../Spinner/Spinner';

const ExchangeComponent = () => {
    const [exchangeData, setExchangeData] = useState(null);
    const apiKey = '49dda43b7e64fbc57b3abbd8';
    const apiUrl = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`;
    
    useEffect(() => {
        // Fonction pour récupérer les données d'échange
        const fetchExchangeData = async () => {
            try {
                const response = await fetch(apiUrl);
                if (!response.ok) {
                    throw new Error(`Erreur: ${response.status}`);
                }
                const data = await response.json();
                setExchangeData(data);
            } catch (error) {
                console.error("Erreur lors de la récupération des données d'échange:", error);
            }
        };

        fetchExchangeData();
    }, []);

    return (
        <div className="c-item exchange-component">
            <div className='title'>Taux de change</div>
            {exchangeData ? (
                <ul className="c-card exchange-list">
                {Object.entries(exchangeData.conversion_rates).map(([currency, rate]) => (
                    <li key={currency}>{currency} : {rate}</li>
                ))}
                </ul>
            ) : (
                <ul className="c-card exchange-list loading">
                    <Spinner />
                </ul>
            )}     
        </div>
    );
};

export default ExchangeComponent;