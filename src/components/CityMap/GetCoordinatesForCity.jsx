import React from 'react';

async function getCoordinatesForCity(city) {
  const apikey = "sSbI019VmZZrIx5w0xXKyq0VDS94JHFD";
  const encodedCity = encodeURIComponent(city); // Ensure the city name is URL-friendly
  const url = `https://api.apilayer.com/geo/city/name/${encodedCity}`;


  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: new Headers({
        "apikey": apikey
      })
    });
    const data = await response.json();

    // Log the response for debugging
    console.log(data);

    // Use the coordinates of the first entry in the list
    const firstEntry = data[0];
    return {
      lat: firstEntry.latitude,
      lng: firstEntry.longitude
    };
  } catch (error) {
    console.error('Erreur lors de la récupération des coordonnées:', error);
    return null; // Return null in case of an error
  }
}
export default getCoordinatesForCity;