import React, { useState, useEffect } from 'react';
import Spinner from '../Spinner/Spinner';
import './Weather.scss';
import Rain from '../../assets/images/rain.jpg';
import Sun from '../../assets/images/sun.jpg';
import Snow from '../../assets/images/snow.jpg';
import Wind from '../../assets/images/wind.jpg';
import Nuages from '../../assets/images/wind.jpg';
import Mist from '../../assets/images/mist.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThermometerHalf, faThermometerQuarter, faThermometerThreeQuarters } from '@fortawesome/free-solid-svg-icons';
import { WiThermometer } from 'weather-icons-react';


function Weather({ city }) {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [weeklyForecast, setWeeklyForecast] = useState(null);
  const [error, setError] = useState(null);
  const [backgroundImage, setBackgroundImage] = useState('');
  const weatherToColor = {
    'Clear': '#000000', // Black text for clear/sun background
    'Rain': '#FFFFFF', // White text for rain background
    'Clouds': '#FFFFFF', // White text for cloudy background
    'Wind': '#000000', // Black text for windy background
    'Snow': '#000000', // Black text for snow background
  };
  
  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY; // Assurez-vous que la clé API est définie dans vos variables d'environnement
        // D'abord, obtenez les coordonnées de la ville
        const coordUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
        const coordResponse = await fetch(coordUrl);
        if (!coordResponse.ok) throw new Error('Ville non trouvée');
        const coordData = await coordResponse.json();

        // Ensuite, utilisez les coordonnées pour obtenir les prévisions sur 7 jours
        const forecastUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordData.coord.lat}&lon=${coordData.coord.lon}&exclude=current,minutely,hourly,alerts&appid=${apiKey}&units=metric`;
        const forecastResponse = await fetch(forecastUrl);
        if (!forecastResponse.ok) throw new Error('Erreur lors de la récupération des prévisions');
        const forecastData = await forecastResponse.json();

        setCurrentWeather(coordData);
        setWeeklyForecast(forecastData.daily);
        setError(null);

        // Choisissez une image de fond basée sur les conditions météorologiques actuelles
        switch (coordData.weather[0].main) {
          case 'Clear':
            setBackgroundImage(Sun);
            break;
          case 'Rain':
            setBackgroundImage(Rain);
            break;
          case 'Clouds':
            setBackgroundImage(Nuages);
            break;
          case 'Wind':
            setBackgroundImage(Wind);
            break;
          case 'Snow':
            setBackgroundImage(Snow);
            break;
          case 'Mist':
            setBackgroundImage(Mist);
            break;
          default:
            setBackgroundImage('');
            break;
        }
      } catch (error) {
        setError(error.message);
        setCurrentWeather(null);
        setWeeklyForecast(null);
        setBackgroundImage('');
      }
    };

    if (city) {
      fetchWeatherData();
    }
  }, [city]);

  if (error) return <div>Erreur : {error}</div>;
  if (!currentWeather || !weeklyForecast) return <div className='loading'><Spinner /></div>;

  // Fonction pour obtenir le chemin de l'icône en fonction du code météo
  const getIconUrl = (iconCode) => `http://openweathermap.org/img/wn/${iconCode}.png`;
  const textColor = currentWeather ? weatherToColor[currentWeather.weather[0].main] : '#000000';
  console.log(weeklyForecast);

  return (
    <div className="weather" style={{ backgroundImage: `url(${backgroundImage})` }}>

      <div className="firstBlock row no-gutters">  
        <div className="temp d-none d-xl-block col-xl-4">
          <p><WiThermometer /> {currentWeather.main.feels_like}°C</p>
          <p><FontAwesomeIcon icon={faThermometerHalf} /> {currentWeather.main.feels_like}°C</p>
          <p><FontAwesomeIcon icon={faThermometerQuarter} /> {currentWeather.main.temp_min}°C</p>
          <p><FontAwesomeIcon icon={faThermometerThreeQuarters} /> {currentWeather.main.temp_max}°C</p>
        </div>

        <div className="ville col col-xl-4">      
          <h1>{currentWeather.name}</h1>
          <p className='country'>{currentWeather.sys.country}</p>
          <p>{new Date(currentWeather.dt * 1000).toLocaleDateString()}</p>
          <p className='hour'>( {new Date(currentWeather.dt * 1000).toLocaleTimeString()} )</p>
          <img src={getIconUrl(currentWeather.weather[0].icon)} alt="Weather icon" className='w-icon'/>
        </div>

        <div className="info d-none d-xl-block col-xl-4">
          <p className='condition'>Conditions: {currentWeather.weather[0].description}</p>
          <p>H: {currentWeather.main.humidity}%</p>
          <p>P: {currentWeather.main.pressure}hPa</p>
          <p>V: {currentWeather.wind.speed}km/h</p>
        </div>
      </div>

      <div className="weekly-forecast" style={{ color: textColor }}>
      {weeklyForecast.map((day, index) => (
        <div key={index} className="daily-forecast d-none d-xl-inline">
          <p>{new Date(day.dt * 1000).toLocaleDateString()}</p>
          <img src={getIconUrl(day.weather[0].icon)} alt="Daily weather icon" className='daily-icon' />
          <p className='ranger'>{Math.round((day.temp.max + day.temp.min) /2)} °C</p>
          {/* <p className='ranger'>{day.temp.min}°C - {day.temp.max}°C</p> */}
        </div>
      ))}
      </div>

    </div>
  );
}

export default Weather;
