import { useState, useEffect, useRef } from "react";
import SectionHead from "./SectionHead.jsx";
import { ImQuotesLeft } from "react-icons/im";   // ← funciona após instalar
import Card from "../UI/Card";
import { IoIosArrowDropleftCircle, IoIosArrowDroprightCircle } from "react-icons/io";
import { testimonials } from "../data.jsx";
import "./testimonials.css";


const Depoimentos = () => {
  const [index, setIndex] = useState(0);
  const intervalRef = useRef(null);

  const { name, quote, job, avatar } = testimonials[index];

  const startAutoSlide = () => {
    if (intervalRef.current) return; // evita duplicar
    intervalRef.current = setInterval(() => {
      setIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
    }, 5000);
  };

  const stopAutoSlide = () => {
    if (!intervalRef.current) return;
    clearInterval(intervalRef.current);
    intervalRef.current = null;
  };

  useEffect(() => {
    startAutoSlide();
    return () => stopAutoSlide();
  }, []);

  const prevTestimonial = () => {
    setIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const nextTestimonial = () => {
    setIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="testimonials">
      <div
        className="container testimonials__container"
        onMouseEnter={stopAutoSlide}
        onMouseLeave={startAutoSlide}
        onTouchStart={stopAutoSlide}
        onTouchEnd={startAutoSlide}
      >
        <SectionHead icon={<ImQuotesLeft />} title="Sobre os Líderes" />

        <Card className="testimonial">
          <div className="testimonial__avatar">
            <img src={avatar} alt={name} />
          </div>
          <p className="testimonial__quote">{`"${quote}"`}</p>
          <h5>{name}</h5>
          <small className="testimonial__title">{job}</small>
        </Card>

        <div className="testimonials__title">
          <button className="testimonials__btn" onClick={prevTestimonial} aria-label="Anterior">
            <IoIosArrowDropleftCircle />
          </button>
          <button className="testimonials__btn" onClick={nextTestimonial} aria-label="Próximo">
            <IoIosArrowDroprightCircle />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Depoimentos;
