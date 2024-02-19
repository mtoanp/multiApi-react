import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './CityMap.scss';

function CityMap({ city }) {
  const mapContainerRef = useRef(null);
  const [coords, setCoords] = useState(null);
  const [map, setMap] = useState(null);
  const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY; // Votre clé API OpenWeatherMap

  useEffect(() => {
    const fetchCoords = async () => {
      try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`);
        if (!response.ok) throw new Error('Erreur lors de la récupération des coordonnées');
        const data = await response.json();
        setCoords({ lat: data.coord.lat, lng: data.coord.lon });
      } catch (error) {
        console.error('Erreur :', error);
      }
    };

    if (city) {
      fetchCoords();
    }
  }, [city]);

  useEffect(() => {
    if (coords && mapContainerRef.current) {
      // Si la carte existe déjà, changez simplement son centre
      if (map) {
        map.setView([coords.lat, coords.lng], 10);
      } else {
        // Sinon, créez une nouvelle carte
        const initialMap = L.map(mapContainerRef.current).setView([coords.lat, coords.lng], 10);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(initialMap);

        setMap(initialMap);
      }
    }
  }, [coords, mapContainerRef]);

  return (
    <div className='map-container' >
      <div ref={mapContainerRef} style={{ height: '100%', width: '100%' }} />
    </div>
  );
}

export default CityMap;
