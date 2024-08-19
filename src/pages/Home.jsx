
import { Link } from 'react-router-dom';

function Home() {
    return (
      <div className="container my-5">
        <header className="mb-4 text-center">
          <h1 className="display-4">Meus Consumos de APIs</h1>
          <p className="lead">Veja abaixo as informações coletadas de diferentes APIs.</p>
        </header>
  
        <section className="mb-4">
          <h2 className="h4">API 1: Ligas internacionais de futebol</h2>
          <p>Abaixo esta buscando uma api de um site onde fiz uma conta para ter acesso as tabelas de times de futebol</p>
          <Link to="/football" className="btn btn-primary">
          Ver detalhes
        </Link>
        </section>
  
        <section className="mb-4">
          <h2 className="h4">API 2: GPT project</h2>
          <p>Abaixo tentei consumir uma api do chat gpt, porém acredito ser pago e recebo erro de que estrapolei o limite</p>
          <Link to="/Gpt" className="btn btn-primary">
          Ver detalhes
        </Link>
        </section>
  
        <footer className="mt-4 pt-3 border-top text-center">
          <p>Feito por [Artur Mineiro].</p>
        </footer>
      </div>
    );
  }
  
  export default Home;