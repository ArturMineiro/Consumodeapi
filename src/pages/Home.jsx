
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
          <h2 className="h4">API 2: Nome da API</h2>
          <p>Descrição breve do que essa API faz e os dados que você está exibindo.</p>
          {/* Adicione aqui os dados da segunda API */}
        </section>
  
        <footer className="mt-4 pt-3 border-top text-center">
          <p>Feito por [Seu Nome].</p>
        </footer>
      </div>
    );
  }
  
  export default Home;