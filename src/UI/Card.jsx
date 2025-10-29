// ✅ Card.jsx com suporte ao efeito Electric Border

const Card = ({ className = '', children }) => {
  return (
    <article className={`card card--electric ${className}`}>
      {/* camada de brilho animado */}
      <span className="card__electric-border"></span>

      {/* conteúdo do card */}
      <div className="card__inner">
        {children}
      </div>
    </article>
  );
};

export default Card;
