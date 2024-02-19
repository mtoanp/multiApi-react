import React, { useState, useEffect } from 'react';
import './Population.scss';

function Population({ title, city }) {
    const [communes, setCommunes] = useState([]);
  
    useEffect(() => {
      const fetchCommunes = async () => {
        try {
          const response = await fetch(`https://geo.api.gouv.fr/communes?nom=${city}`);
          const data = await response.json();
          // Filtrer les données pour ne garder que celles correspondant exactement à la ville recherchée
          const filteredData = data.filter(commune => commune.nom.toLowerCase() === city.toLowerCase());
          setCommunes(filteredData);
        } catch (error) {
          console.error('Erreur lors de la récupération des communes:', error);
        }
      };
  
      if (city) {
        fetchCommunes();
      }
    }, [city]);
    
    return (
      <div className="c-item population">
        <div className="title">
          {title}
        </div>
        
        <div className="c-card communes-list">
          {communes.map((commune, index) => (
            <div key={index} className="commune">
              <h3>{commune.nom}</h3>
              <p>Code: {commune.code}</p>
              <p>Département: {commune.codeDepartement}</p>
              <p>Population: {commune.population}</p>   
            </div>
          ))}
        </div>
      </div>
    );
}
  
export default Population;