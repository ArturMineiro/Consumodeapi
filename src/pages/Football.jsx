import React, { useEffect, useState } from 'react';

function Football() {
    const [leagues, setLeagues] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        var myHeaders = new Headers();
        myHeaders.append("x-apisports-key", "92a1d9885eb527e9ed11fc0052727ad1"); // Use sua API key
        myHeaders.append("x-rapidapi-host", "v3.football.api-sports.io");

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch("https://v3.football.api-sports.io/leagues", requestOptions)
            .then(response => response.json())
            .then(result => {
                setLeagues(result.response); // Aqui, result.response contém a lista de ligas
                setLoading(false);
            })
            .catch(error => {
                setError(error.message);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div>Carregando...</div>;
    }

    if (error) {
        return <div>Erro: {error}</div>;
    }

    return (
        <div>
            <h1>Ligas de Futebol</h1>
            <table border="1" cellPadding="10">
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>País</th>
                        <th>Temporada Atual</th>
                        <th>Logo</th>
                    </tr>
                </thead>
                <tbody>
                    {leagues.map((league) => (
                        <tr key={league.league.id}>
                            <td>{league.league.name}</td>
                            <td>{league.country.name}</td>
                            <td>{league.seasons[0].year}</td>
                            <td><img src={league.league.logo} alt={`${league.league.name} logo`} width="50" /></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Football;
