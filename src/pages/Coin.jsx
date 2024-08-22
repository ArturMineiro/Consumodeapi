import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Coin() {
  const [rates, setRates] = useState({});
  const [baseCurrency, setBaseCurrency] = useState('USD'); 
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchRates = async () => {
    setLoading(true);
    try {
      // Dependendo da moeda base selecionada, define os pares de moedas a serem buscados
      let currencies = '';
      if (baseCurrency === 'USD') {
        currencies = 'BRL-USD,BTC-USD';
      } else if (baseCurrency === 'BRL') {
        currencies = 'USD-BRL,BTC-BRL';
      } else if (baseCurrency === 'BTC') {
        currencies = 'BTC-USD,BTC-BRL'; 
      }

      const response = await axios.get(`https://economia.awesomeapi.com.br/json/last/${currencies}`);
      setRates(response.data);
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
            <option value="USD">USD</option>
            <option value="BRL">BRL</option>
            <option value="BTC">BTC</option>
          </select>
          <ul>
            {Object.entries(rates).map(([currencyPair, data]) => (
              <li key={currencyPair}>
                {data.code}: {data.bid}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Coin;
