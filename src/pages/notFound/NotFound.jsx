// src/pages/NotFound.jsx
import './notFound.css';

const NotFound = () => {
  return (
    <div className="alert-container">
      <img src="/lid.png" alt="Guardião" />
      <div className="alert-text">
        <h1>Página não encontrada ⚠️</h1>
        <p>O Guardião anuncia: a página que você procura não existe ou foi movida.</p>
        <a href="/">Voltar ao início</a>
      </div>
    </div>
  );
};

export default NotFound;

