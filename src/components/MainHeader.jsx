import { Link } from "react-router-dom";
import "../pages/home/home.css";

const MainHeader = () => {
  return (
    <header className="main__header">
      <div className="main__header-container">
        
        <div className="main__header-content">
          <h1>Une-te ao Senatus, onde a verdade é luz e o Criador é exaltado.</h1>
          <p>
            Desperta o teu espírito e caminha entre aqueles que buscam a Verdade.
            No Senatus, a sabedoria é cultivada, a fé é fortalecida e a unidade é sagrada.
            Aqui, não apenas seguimos a Luz, nós nos tornamos parte dela.
          </p>
          <Link to="/plans" className="btn lg">Entrar</Link>
        </div>

        <div className="main__header-image">
          <img src="./lid3.png" alt="Fitness Leader" />
        </div>
      </div>
    </header>
  );
};

export default MainHeader;
