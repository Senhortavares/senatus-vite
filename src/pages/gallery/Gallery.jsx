import React, { useState, useEffect } from "react";
import "./gallery.css";

const Gallery = () => {
  const images = [
    { src: "/civil.png", alt: "IMG Oficial 1" },
    { src: "/civil2.png", alt: "IMG Oficial 2" }
  ];

  const [displayText, setDisplayText] = useState("⟟⋏⏃⋔⟒ ⊑⟒⟟⋏");
  const realText = "IMAGEM OFICIAIS DOS CIVIS DO SENATUS ⚖️";

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplayText(
        realText.slice(0, i + 1) + "▒".repeat(realText.length - i - 1)
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
                 Baixar {img.alt}
              </a>
            </div>
          ))}
        </div>

        <div className="gallery__steps">
          <h3>Como fazer figurinha no WhatsApp</h3>
          <ol>
            <li>Baixe uma das das imagens clicando no botão acima.</li>
            <li>Abra o WhatsApp no seu celular.</li>
            <li>Entre no grupo e adicione a figurinha.</li>
            <li>
              Se quiser transformar em sticker, use um app como <b>Sticker Maker</b> ou similar.
            </li>
<li>
             Agora você faz parte oficialmente do <b>Senatus</b>{" "}
             <img 
               src="/logo.ico" 
               alt="Logo Senatus" 
               style={{ width: "18px", height: "18px", verticalAlign:            "middle" }}
  />
           </li>
          </ol>
        </div>
      </div>
    </section>
  );
};

export default Gallery;
