// src/components/Footer.jsx
import { Link } from 'react-router-dom';
import Logo from '../../public/logo.png';
import { AiFillInstagram } from 'react-icons/ai';
import './footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container footer__container">
        <div className="footer__logo-left">
          <Link to="/" className="logo">
            <img src={Logo} alt="Logo Senatus Esquerda" />
          </Link>
        </div>

        <div className="footer__content">
          <h4 className="footer__title">SENATUS</h4>
          <p className="footer__verse">
            Salmos 24:4 — Aquele que tem as mãos limpas e o coração puro, e não se entrega à mentira, nem age com falsidade.
          </p>
          <ul className="footer__links">
            <li><Link to="/plans">Fomulario</Link></li>
            <li><Link to="/gallery">Imagens</Link></li>
            <li><Link to="/notis">Jogos</Link></li>
            <li><Link to="/Ouvidoria">Duvidas</Link></li>
            <li><Link to="/sobre">Sobre</Link></li>
          </ul>
          <div className="footer__socials">    {/*  ___redes sociais do senatus_______ */}
            <a href="https://instagram.com/s.e.n.a.t.u.s" target="_blank" rel="noreferrer noopener" aria-label="Instagram">
              <AiFillInstagram size={28} />
            </a>
          </div>
          <small className="footer__copyright">
            ANO DE CRIAÇÃO 2025/09/25 &copy;
          </small>
        </div>

        <div className="footer__logo-right">
          <img src={Logo} alt="Logo Senatus Direita" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
