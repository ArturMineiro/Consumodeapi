import React, { useEffect, useState } from 'react';

function Cat() {
  const [catImage, setCatImage] = useState('');
  const [breedInfo, setBreedInfo] = useState(null);
  const apiKey = import.meta.env.VITE_CAT_API_KEY;

  // Função para buscar dados do gato
  const fetchCatData = async () => {
    try {
      const response = await fetch('https://api.thecatapi.com/v1/images/search?has_breeds=1', {
        headers: {
          'x-api-key': apiKey
        }
      });
      const data = await response.json();
      setCatImage(data[0]?.url); // Pega a URL da imagem
      setBreedInfo(data[0]?.breeds[0]); // Pega as informações da raça
    } catch (error) {
      console.error('Erro ao buscar dados do gato:', error);
    }
  };

  // Chama a função de busca ao carregar o componente
  useEffect(() => {
    fetchCatData();
  }, []);

  return (
    <div>
      {catImage ? <img src={catImage} alt="A cute cat" width={'700px'} height={'700px'}/> : <p>Carregando...</p>}
      {breedInfo && (
        <div>
          <h2>{breedInfo.name}</h2>
          <p>Temperamento: {breedInfo.temperament}</p>
          <p>Origem: {breedInfo.origin}</p>
          <a href={breedInfo.wikipedia_url} target="_blank" rel="noopener noreferrer">Saiba mais sobre a raça</a>
        </div>
      )}
      {/* Botão para atualizar o gato */}
      <button onClick={fetchCatData}>Atualizar Gato</button>
    </div>
  );
}

export default Cat;
