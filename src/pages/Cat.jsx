import React, { useEffect, useState } from 'react';

function Cat() {
  const [catImage, setCatImage] = useState('');
  const apiKey = import.meta.env.VITE_CAT_API_KEY;

  useEffect(() => {
    const fetchCatImage = async () => {
      try {
        const response = await fetch('https://api.thecatapi.com/v1/images/search', {
          headers: {
            'x-api-key': apiKey
          }
        });
        const data = await response.json();
        setCatImage(data[0]?.url); // Pegue a URL da primeira imagem retornada
      } catch (error) {
        console.error('Erro ao buscar a imagem do gato:', error);
      }
    };

    fetchCatImage();
  }, [apiKey]);

  return (
    <div>
      {catImage ? <img src={catImage} alt="A cute cat" /> : <p>Carregando...</p>}
    </div>
  );
}

export default Cat;
