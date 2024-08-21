import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Weather() {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const lat = 44.34; // Latitude do local desejado
        const lon = 10.99; // Longitude do local desejado
        const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;
        
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=pt_br`
        );

        setWeatherData(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchWeather();
  }, []);

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (error) {
    return <div>Erro: {error}</div>;
  }

  return (
    <div>
      <h3>Tempo em {weatherData?.name}</h3>
      <p>Temperatura: {weatherData?.main.temp}°C</p>
      <p>Descrição: {weatherData?.weather[0].description}</p>
      <p>Umidade: {weatherData?.main.humidity}%</p>
      <p>Vento: {weatherData?.wind.speed} m/s</p>
    </div>
  );
}

export default Weather;
