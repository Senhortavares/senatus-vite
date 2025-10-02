import { Link } from "react-router-dom";
import "../pages/home/home.css";

const MainHeader = () => {
  return (
    <header className="main__header">
      <div className="main__header-container">
        
        <div className="main__header-content">
          <h1>Une-te ao Senatus, onde a verdade é luz e o Criador é exaltado.</h1>
          <p>
            O Senatus há de te amparar, pois caminhamos sempre em unidade, guiados pela luz do Altíssimo.
          </p>
          <Link to="/plans" className="btn lg">Entrar</Link>
        </div>

        <div className="main__header-image">
          <img src="./public/lid.png" alt="Fitness Leader" />
        </div>
      </div>
    </header>
  );
};

export default MainHeader;
