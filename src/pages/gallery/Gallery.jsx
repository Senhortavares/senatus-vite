import React, { useState, useEffect } from "react";
import "./gallery.css";

const Gallery = () => {
  const images = [
    { src: "../../public/civil.png", alt: "Figurinha Oficial 1" },
    { src: "../../public/civil2.png", alt: "Figurinha Oficial 2" }
  ];

  const [displayText, setDisplayText] = useState("⟟⋏⏃⋔⟒ ⊑⟒⟟⋏");
  const realText = "FIGURINHAS OFICIAIS DO SENATUS ⚖️";

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplayText(
        realText.slice(0, i + 1) +
          "▒".repeat(realText.length - i - 1)
      );
      i++;
      if (i === realText.length) clearInterval(interval);
    }, 120);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="gallery">
      <div className="container gallery__container">
        <h2 className="gallery__title">{displayText}</h2>

        <div className="gallery__images">
          {images.map((img, idx) => (
            <div className="gallery__card" key={idx}>
              <img src={img.src} alt={img.alt} />
              <a href={img.src} download className="download-btn">
                📥 Baixar {img.alt}
              </a>
            </div>
          ))}
        </div>

        <div className="gallery__steps">
          <h3>📌 Como usar no WhatsApp</h3>
          <ol>
            <li>Baixe uma das figurinhas clicando no botão acima.</li>
            <li>Abra o WhatsApp no seu celular.</li>
            <li>Entre no grupo e adicione a figurinha.</li>
            <li>Se quiser transformar em sticker, use um app como <b>Sticker Maker</b> ou similar.</li>
            <li>Agora você faz parte oficialmente do <b>Senatus</b> ⚔️.</li>
          </ol>
        </div>
      </div>
    </section>
  );
};

export default Gallery;
