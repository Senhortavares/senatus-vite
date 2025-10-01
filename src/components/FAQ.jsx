
import { useState } from "react";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import "./faqs.css";

const FAQ = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleFAQ = () => {
    setIsOpen(!isOpen);
  };

  return (
    <article className={`faq ${isOpen ? "open" : ""}`}>
  <div className="faq__header" onClick={toggleFAQ}>
    <h4>{question}</h4>
    <button className="faq__icon">
      {isOpen ? <AiOutlineMinus /> : <AiOutlinePlus />}
    </button>
  </div>
  {isOpen && <p className="faq__answer">{answer}</p>}
</article>

  );
};

export default FAQ;