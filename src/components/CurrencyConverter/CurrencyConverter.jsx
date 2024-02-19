import React, { useState, useEffect } from 'react';
import './CurrencyConverter.scss';

const CurrencyConverter = () => {
    const [exchangeData, setExchangeData] = useState(null);
    const [amount, setAmount] = useState('');
    const [targetCurrency, setTargetCurrency] = useState('EUR');
    const [convertedAmount, setConvertedAmount] = useState(null);
    const apiKey = '49dda43b7e64fbc57b3abbd8';
    const apiUrl = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`;

    useEffect(() => {
        const fetchExchangeData = async () => {
            try {
                const response = await fetch(apiUrl);
                const data = await response.json();
                setExchangeData(data);
            } catch (error) {
                console.error("Erreur lors de la récupération des données d'échange:", error);
            }
        };

        fetchExchangeData();
    }, []);

    const convertCurrency = () => {
        if (!amount || !exchangeData || !exchangeData.conversion_rates[targetCurrency]) {
            return;
        }

        const rate = exchangeData.conversion_rates[targetCurrency];
        const result = amount * rate;
        setConvertedAmount(result.toFixed(2));
    };

    return (
        <div className="c-item currency-converter">
            <h2 className='title'>Convertir la Devise</h2>
            <input 
                type="number" 
                value={amount} 
                onChange={e => setAmount(e.target.value)} 
                placeholder="Montant en USD" 
            />
            <select 
                value={targetCurrency} 
                onChange={e => setTargetCurrency(e.target.value)}
                disabled={!exchangeData}
            >
               {exchangeData && exchangeData.conversion_rates && Object.keys(exchangeData.conversion_rates).map(currency => (
    <option key={currency} value={currency}>{currency}</option>
))}

            </select>
            <p className='result'>          
                {convertedAmount && <div className=''>{amount} USD = {convertedAmount} {targetCurrency}</div>}
            </p>
            <button onClick={convertCurrency} disabled={!exchangeData}>Convertir</button>
            
        </div>
    );
};

export default CurrencyConverter;
