import SectionHead from "./SectionHead.jsx";
import { values } from "../data.jsx";
import Card from "../UI/Card";
import "./values.css";

const Values = () => {
  return (
    <section className="values">
      <div className="container values__container">
        <div className="values__left">
          <div className="values__image">
            {/* <img src="../../public/filos.png" alt="FILOSOFIA Image" /> */}
          </div>
        </div>

        <div className="values__right">
          <SectionHead title="Filosofia" />
          <p>
            Junte-se ao Senatus! Aqui, todos são respeitados e acolhidos, seguindo os ensinamentos do Criador: ajudar uns aos outros com amor e dedicação. Nossos líderes estão prontos para te receber e garantir que você se sinta bem.
          </p>

          <div className="values__wrapper">
            {values.map(({ id, img, title, desc }) => (
              <Card key={id} className="values__value">
                {/* Imagem no lugar do ícone */}
                <img src={img} alt={title} className="value__img" />
                <h4>{title}</h4>
                <small>{desc}</small>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Values;
