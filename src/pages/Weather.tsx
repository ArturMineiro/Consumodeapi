import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles.css'; 
import Button from '../components/Button';

interface WeatherData {
  name: string;
  main: {
    temp: number;
    humidity: number;
  };
  weather: {
    description: string;
  }[];
  wind: {
    speed: number;
  };
}

function Weather() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [location, setLocation] = useState<{ lat: number | null, lon: number | null }>({ lat: null, lon: null });
  const [city, setCity] = useState<string>(''); // Estado para armazenar o nome da cidade
  const [suggestions, setSuggestions] = useState<string[]>([]); // Estado para armazenar sugestões de cidades

  const fetchWeather = async (lat: number | null, lon: number | null, city?: string) => {
    try {
      setLoading(true);
      const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;
      let url = '';

      if (city) {
        // Ajuste a URL se a cidade tiver um formato diferente
        url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=pt_br`;
      } else if (lat !== null && lon !== null) {
        url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=pt_br`;
      }

      if (url) {
        const response = await axios.get(url);
        setWeatherData(response.data);
        setError(null); // Limpar erro ao obter sucesso
      } else {
        setError('Localização não fornecida.');
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const updateLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ lat: latitude, lon: longitude });
          fetchWeather(latitude, longitude);
        },
        (error) => {
          setError('Erro ao obter localização: ' + error.message);
        }
      );
    } else {
      setError('Geolocalização não é suportada pelo navegador.');
    }
  };

  const searchByCity = () => {
    console.log('Cidade atual:', city); // Debug: Mostrar valor de city
    if (city.trim()) { // Verifica se a cidade não está vazia
      fetchWeather(null, null, city);
    } else {
      setError('Digite o nome da cidade.');
    }
  };

  useEffect(() => {
    if (location.lat !== null && location.lon !== null) {
      fetchWeather(location.lat, location.lon);
    }
  }, [location]);

  // Função para lidar com as mudanças no input de cidade e buscar sugestões da API
  const handleCityChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const userInput = e.target.value;
    setCity(userInput);

    if (userInput.length > 3) { // Buscar sugestões apenas se o usuário digitar mais de 2 caracteres
      try {
        const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;
        const response = await axios.get(`https://api.openweathermap.org/geo/1.0/direct?q=${userInput}&limit=5&appid=${apiKey}`);
        
        // Filtrar duplicatas e formatar sugestões
        const uniqueSuggestions = response.data.map((city: any) => `${city.name}, ${city.country}`)
          .filter((value: string, index: number, self: string[]) => self.indexOf(value) === index);
        
        setSuggestions(uniqueSuggestions);
      } catch (err) {
        console.error('Erro ao buscar sugestões de cidade:', err);
      }
    } else {
      setSuggestions([]);
    }
  };

  // Função para lidar com a seleção de uma sugestão
  const handleSuggestionClick = (suggestion: string) => {
    // Divide a sugestão para extrair apenas o nome da cidade
    const cityName = suggestion.split(',')[0];
    setCity(cityName);
    setSuggestions([]); // Esconder as sugestões após a seleção
    fetchWeather(null, null, cityName); // Buscar o clima para a cidade selecionada
  };

  return (
    <div className="container mt-4">
      <h3>Tempo Atual</h3>
      {loading ? (
        <div>Carregando...</div>
      ) : error ? (
        <div className="alert alert-danger">Erro: {error}</div>
      ) : (
        weatherData && (
          <div>
            <p><strong>Local:</strong> {weatherData.name}</p>
            <p><strong>Temperatura:</strong> {weatherData.main.temp}°C</p>
            <p><strong>Descrição:</strong> {weatherData.weather[0].description}</p>
            <p><strong>Umidade:</strong> {weatherData.main.humidity}%</p>
            <p><strong>Vento:</strong> {weatherData.wind.speed} m/s</p>
          </div>
        )
      )}
      <div className="button-container">
        <button className="btn btn-primary" onClick={updateLocation}>Localização atual</button>
      </div>
      <div className="spacing-top">
        <input
          type="text"
          className="form-control mb-2"
          placeholder="Digite o nome da cidade"
          value={city}
          onChange={handleCityChange}
        />
        <ul className="suggestions">
          {suggestions.map((suggestion, index) => (
            <li key={index} onClick={() => handleSuggestionClick(suggestion)}>
              {suggestion}
            </li>
          ))}
        </ul>
        <button className="btn btn-secondary" onClick={searchByCity}>Buscar por lugar</button>
      </div>
      <Button to="/">Voltar</Button>
    </div>
  );
}

export default Weather;
