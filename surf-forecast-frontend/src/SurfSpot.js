import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SurfSpot = ({ lat, lon }) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Debug: Log when fetch starts
    console.log('Fetching surf and weather data for:', lat, lon);

    // Fetch combined Surf and Weather Report
    const fetchSurfWeatherData = async () => {
      try {
        console.log('Attempting to fetch data from the API...');
        const response = await axios.get('http://localhost:3000/api/surf-weather', {
          params: { lat, lon },
        });
    
        console.log('API response:', response); // Log the full response, not just the data
    
        setData(response.data);  // Store the data in the state
      } catch (error) {
        console.error('Error occurred while fetching data:', error); // Log the full error object
        setError('Failed to fetch surf and weather data');
      }
    };

    fetchSurfWeatherData();
  }, [lat, lon]);

  // Debug: Log data and error state changes
  useEffect(() => {
    console.log('Data updated:', data);
    console.log('Error state:', error);
  }, [data, error]);

  if (error) {
    return <div>{error}</div>;
  }

  if (!data) {
    // Debug: Log loading state
    console.log('Loading data...');
    return <div>Loading...</div>;
  }

  // Access weather and marine data from the response
  const { weather, marine } = data;

  // Debug: Log the weather and marine data structures
  console.log('Weather data:', weather);
  console.log('Marine data:', marine);

  return (
    <div>
      <h1>Surf & Weather Forecast - Maroubra Beach</h1>

      <h2>Weather Conditions</h2>
      <p>Temperature: {weather?.temperature2m?.[0]?.toFixed(2)}°F</p>
      <p>Pressure: {weather?.pressureMsl?.[0]?.toFixed(2)} hPa</p>
      <p>Wind Speed: {weather?.windSpeed10m?.[0]?.toFixed(2)} Knots</p>
      <p>Wind Direction: {weather?.windDirection10m?.[0]?.toFixed(2)}°</p>

      {/* Display Marine Data */}
      <h2>Marine Conditions</h2>
      <p>Wave Height: {marine?.waveHeight?.toFixed(2)} ft</p>
      <p>Wave Direction: {marine?.waveDirection?.toFixed(2)}°</p>
      <p>Wave Period: {marine?.wavePeriod?.toFixed(2)} seconds</p>

    </div>
  );
};

export default SurfSpot;
