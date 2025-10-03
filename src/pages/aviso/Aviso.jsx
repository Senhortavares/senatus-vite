import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { avisos } from "../../data";
import "./aviso.css";

const Aviso = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [currentId, setCurrentId] = useState(id ? parseInt(id, 10) : avisos[0].id);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (id) {
      const parsed = parseInt(id, 10);
      if (avisos.some((a) => a.id === parsed)) {
        setCurrentId(parsed);
      } else {
        navigate("/avisos/1");
      }
    }
  }, [id, navigate]);

  const currentIndex = avisos.findIndex((aviso) => aviso.id === currentId);

  const nextSlide = () => {
    const nextIndex = currentIndex === avisos.length - 1 ? 0 : currentIndex + 1;
    const nextId = avisos[nextIndex].id;
    setCurrentId(nextId);
    navigate(`/avisos/${nextId}`);
  };

  const prevSlide = () => {
    const prevIndex = currentIndex === 0 ? avisos.length - 1 : currentIndex - 1;
    const prevId = avisos[prevIndex].id;
    setCurrentId(prevId);
    navigate(`/avisos/${prevId}`);
  };

  // autoplay com pausa ao segurar
  useEffect(() => {
    if (!paused) {
      const interval = setInterval(() => {
        nextSlide();
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [currentIndex, paused]);

  return (
    <section className="aviso-section">
      <h2 className="aviso-title">Avisos</h2>
      <div className="aviso-layout">

        {/* Guardião fixo */}
        <div className="aviso-guardian">
          <img src="/cavaleiro.png" alt="Guardião" />
        </div>

        {/* Carrossel de avisos */}
        <div
          className="aviso-carousel"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onTouchStart={() => setPaused(true)}
          onTouchEnd={() => setPaused(false)}
        >
          {avisos.map((aviso) => (
            <div
              key={aviso.id}
              className={`aviso-slide ${aviso.id === currentId ? "active" : ""}`}
            >
              <h3>{aviso.title}</h3>
              <p>{aviso.desc}</p>
            </div>
          ))}

          {/* Botões */}
          <button className="prev" onClick={prevSlide}>❮</button>
          <button className="next" onClick={nextSlide}>❯</button>

          {/* Bolinhas */}
          <div className="dots">
            {avisos.map((aviso) => (
              <span
                key={aviso.id}
                onClick={() => {
                  setCurrentId(aviso.id);
                  navigate(`/avisos/${aviso.id}`);
                }}
                className={`dot ${aviso.id === currentId ? "active" : ""}`}
              ></span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Aviso;
