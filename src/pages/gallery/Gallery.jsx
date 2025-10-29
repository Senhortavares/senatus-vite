import React, { useState, useEffect, useRef } from "react";
import "./gallery.css";

const Gallery = () => {
  const images = [
    { src: "/civil.png", alt: "Imagem Oficial 1" },
    { src: "/civil2.png", alt: "Imagem Oficial 2" },
  ];

  // Texto com efeito "digitando"
  const [displayText, setDisplayText] = useState("⟟⋏⏃⋔⟒ ⊑⟒⟟⋏");
  const finalText = "IMAGENS OFICIAIS DOS CIVIS DO SENATUS ⚖️";

  // Ref para capturar cada card
  const cardsRef = useRef([]);

  useEffect(() => {
    let index = 0;
    const typing = setInterval(() => {
      setDisplayText(
        finalText.slice(0, index + 1) + "▒".repeat(finalText.length - index - 1)
      );
      index++;
      if (index === finalText.length) clearInterval(typing);
    }, 90);
    return () => clearInterval(typing);
  }, []);

  // 💥 INTERSECTION OBSERVER — anima quando o card entra na tela
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("show-card");
        });
      },
      { threshold: 0.2 }
    );

    cardsRef.current.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  return (
    <section className="gallery">
      <div className="gallery__container">

        <h2 className="gallery__title">{displayText}</h2>

        <div className="gallery__images">
          {images.map((img, index) => (
            <div
              className="gallery__card fade-card"
              key={index}
              ref={(el) => (cardsRef.current[index] = el)}
            >
              <img src={img.src} alt={img.alt} />
              <a href={img.src} download className="download-btn">
                Baixar {img.alt}
              </a>
            </div>
          ))}
        </div>

        <div className="gallery__steps">
          <h3>Como transformar a imagem em figurinha no WhatsApp</h3>
          <ol>
            <li>Clique em <b>Baixar imagem</b> no card acima.</li>
            <li>Abra o WhatsApp no celular.</li>
            <li>Envie a imagem para algum chat.</li>
            <li>Toque na imagem enviada → “Adicionar às figurinhas”.</li>
            <li>
              Pronto! Você agora faz parte do <b>Senatus</b>{" "}
              <img
                src="/logo.ico"
                alt="Logo Senatus"
                style={{
                  width: "18px",
                  height: "18px",
                  verticalAlign: "middle",
                }}
              />
            </li>
          </ol>
        </div>

      </div>
    </section>
  );
};

export default Gallery;
