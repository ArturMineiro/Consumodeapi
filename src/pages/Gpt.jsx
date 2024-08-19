import React, { useState } from 'react';

function Gpt() {
  const [question, setQuestion] = useState(''); 
  const [response, setResponse] = useState('');

  const callAPI = async () => {
    const apiKey = import.meta.env.VITE_CHATGPT_KEY; // Usando a chave com prefixo VITE_
    const apiUrl = "https://api.openai.com/v1/chat/completions";

    const data = {
      model: "gpt-3.5-turbo", 
      messages: [{ role: "user", content: question }],
      max_tokens: 56 // Definindo o número máximo de tokens na resposta
    };

    try {
      const res = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify(data)
      });

      const result = await res.json();
      
      // Log para ver a resposta completa
      console.log(result);

      // Verificação e tratamento de resposta
      if (result.choices && result.choices.length > 0) {
        setResponse(result.choices[0].message.content);
      } else {
        setResponse("Não foi possível obter uma resposta adequada.");
      }

    } catch (error) {
      console.error("Erro ao chamar a API", error);
      setResponse("Erro ao chamar a API.");
    }
  };

  return (
    <div>
      <h1>GPT PROJECTS</h1>
      <textarea 
        value={question} 
        onChange={(e) => setQuestion(e.target.value)} 
        placeholder="Digite sua pergunta aqui" 
        rows="4" 
        cols="50"
      />
      <br />
      <button onClick={callAPI}>Enviar</button>
      <div>
        <h2>Resposta:</h2>
        <p>{response}</p>
      </div>
    </div>
  );
}

export default Gpt;
