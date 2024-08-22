import React, { useState, useEffect } from 'react';
import axios from 'axios';




function Coin() {
    const [rates, setRates] = useState({});
    const [baseCurrency, setBaseCurrency] = useState('EUR'); // Moeda base padrão
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
  
    const fetchRates = async () => {
      setLoading(true);
      try {
        const apiKey = import.meta.env.VITE_COIN_API_KEY;
        const response = await axios.get(`http://api.exchangeratesapi.io/v1/latest?access_key=${apiKey}&base=${baseCurrency}`);
        setRates(response.data.rates);
      } catch (err) {
        setError('Erro ao buscar cotações');
      } finally {
        setLoading(false);
      }
    };
  
    useEffect(() => {
      fetchRates();
    }, [baseCurrency]);
  
    return (
      <div className="container">
        <h3>Cotações de Moedas</h3>
        {loading ? (
          <p>Carregando...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <div>
            <select onChange={(e) => setBaseCurrency(e.target.value)} value={baseCurrency}>
              {Object.keys(rates).map((currency) => (
                <option key={currency} value={currency}>
                  {currency}
                </option>
              ))}
            </select>
            <ul>
              {Object.entries(rates).map(([currency, rate]) => (
                <li key={currency}>
                  {currency}: {rate}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  }
  
  export default Coin;