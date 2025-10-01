
import SectionHead from './sectionHead';
import { FaQuestion } from 'react-icons/fa';
import { faqs } from '../data.jsx';
import FAQ from './FAQ'; 
import './faqs.css';

const FAQs = () => {
  return (
    <section className="faqs">
      <div className="container faqs__container">
        <SectionHead icon={<FaQuestion />} title="Perguntas" />
        <div className="faqs__wrapper">
          {faqs.map(({ id, question, answer }) => (
            <FAQ key={id} question={question} answer={answer} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQs;