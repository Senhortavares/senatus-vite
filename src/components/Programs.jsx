// src/components/Programs.jsx
import { FaCrown } from 'react-icons/fa';
import SectionHead from './sectionHead';
import { programs } from '../data.jsx';
import Card from '../UI/Card';

const Programs = () => {
  return (
    <section className="programs">
      <div className="container programs__container">
        <SectionHead icon={<FaCrown />} title="LÍDERES" />
        <div className="programs__wrapper">
          {programs.map(({ id, icon, title, path, info, imagem }) => (
            <Card className="programs__program" key={id}>
              <span className="programs__icon">{icon}</span>
              <h4>{title}</h4>
              <small>{info}</small>
              <img src={imagem} alt={title} />
              {/* <Link to={path} className="btn sm">enviar</Link> */}
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Programs;
