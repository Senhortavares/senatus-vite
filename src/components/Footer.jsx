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
            JOÃO 3:16 — Porque Deus amou o mundo de tal maneira que deu o seu Filho unigênito, para que todo aquele que nele crê não pereça, mas tenha a vida eterna.
          </p>
          <ul className="footer__links">
            <li><Link to="/sobre">Sobre</Link></li>
            <li><Link to="/plans">Formulário</Link></li>
            <li><Link to="/ouvidoria">Ouvidoria</Link></li>
            <li><Link to="/gallery">Galeria</Link></li>
            <li><Link to="/contato">Contato</Link></li>
          </ul>
          <div className="footer__socials">
            <a href="https://instagram.com/senatus" target="_blank" rel="noreferrer noopener" aria-label="Instagram">
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
