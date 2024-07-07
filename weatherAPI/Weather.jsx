import React, { useState } from 'react';
import axios from 'axios';

const Weather = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  const apiKey = 'https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&hourly=temperature_2m';

  const fetchWeather = async () => {
    if (city === '') {
      setError('Please enter a city');
      return;
    }

    try {
      const response = await axios.get(
        `https://api.tomorrow.io/v4/weather/realtime`,
        {
          params: {
            location: city,
            apikey: apiKey,
          },
        }
      );
      setWeather(response.data);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Error fetching weather data');
      setWeather(null);
    }
  };

  return (
    <div>
      <h1>Weather App</h1>
      <input
        type="text"
        placeholder="Enter city"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button onClick={fetchWeather}>Get Weather</button>
      {error && <p>{error}</p>}
      {weather && (
        <div>
          <h2>{weather.location.name}</h2>
          <p>Temperature: {weather.data.values.temperature}°C</p>
          <p>Weather: {weather.data.values.weatherCode}</p>
          <p>Humidity: {weather.data.values.humidity}%</p>
          <p>Wind Speed: {weather.data.values.windSpeed} m/s</p>
        </div>
      )}
    </div>
  );
};

export default Weather;
