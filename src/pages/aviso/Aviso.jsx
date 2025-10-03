import { useState, useEffect } from "react";
import { avisos } from "../../data";
import "./aviso.css";

const Aviso = () => {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  const nextSlide = () => {
    setCurrent(current === avisos.length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? avisos.length - 1 : current - 1);
  };

  // autoplay mais rápido (3s), pausa no hover ou touch
  useEffect(() => {
    if (!paused) {
      const interval = setInterval(() => {
        nextSlide();
      }, 3000); // 3 segundos
      return () => clearInterval(interval);
    }
  }, [current, paused]);

  return (
    <section className="aviso-section">
      <h2 className="aviso-title">Avisos</h2>
      <div className="aviso-layout">
        
        {/* Guardião fixo */}
        <div className="aviso-guardian">
          <img src="/lid1.png" alt="Guardião" />
        </div>

        {/* Carrossel dos avisos */}
        <div
          className="aviso-carousel"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onTouchStart={() => setPaused(true)}
          onTouchEnd={() => setPaused(false)}
        >
          {avisos.map((aviso, index) => (
            <div
              key={aviso.id}
              className={`aviso-slide ${index === current ? "active" : ""}`}
            >
              <h3>{aviso.title}</h3>
              <p>{aviso.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Botões e bolinhas fora do card */}
      <div className="aviso-controls">
        <button className="prev" onClick={prevSlide}>❮</button>
        <div className="dots">
          {avisos.map((_, index) => (
            <span
              key={index}
              onClick={() => setCurrent(index)}
              className={`dot ${index === current ? "active" : ""}`}
            ></span>
          ))}
        </div>
        <button className="next" onClick={nextSlide}>❯</button>
      </div>
    </section>
  );
};

export default Aviso;
