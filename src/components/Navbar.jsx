import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "./navbar.css"; // agora o arquivo está em src/components/navbar.css
import { links } from "../data.jsx";
import { GiAbstract009 } from "react-icons/gi";
import { FaTimes } from "react-icons/fa";

const Navbar = () => {
  const [isNavShowing, setIsNavShowing] = useState(false);

  return (
    <nav>
      <div className="nav__container">

        {/* Logo */}
        <Link to="/" className="logo" onClick={() => setIsNavShowing(false)}>
          <img src="/logo.png" alt="Logo do site" /> {/* /logo.png vindo da pasta public */}
        </Link>

        {/* Overlay atrás do menu */}
        {isNavShowing && (
          <div className="nav__overlay" onClick={() => setIsNavShowing(false)}></div>
        )}

        {/* Links */}
        <ul className={`nav__link ${isNavShowing ? "show_nav" : "hide_nav"}`}>
          {links.map(({ name, path }, index) => (
            <li
              key={path}
              style={{ animationDelay: `${index * 0.1}s` }}
              className={isNavShowing ? "fade-in" : "fade-out"}
            >
              <NavLink
                to={path}
                className={({ isActive }) => (isActive ? "active-nav" : "")}
                onClick={() => setIsNavShowing(false)}
              >
                {name}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Botão toggle */}
        {/* <button
          className="nav__toggle-boton"
          onClick={() => setIsNavShowing(!isNavShowing)}
          aria-label="Abrir/fechar menu"
        >
          {isNavShowing ? <FaTimes /> : <GiAbstract009 />}
        </button> */}
      </div>

       <button
          className="nav__toggle-boton"
          onClick={() => setIsNavShowing(!isNavShowing)}
          aria-label="Abrir/fechar menu"
        >
          {isNavShowing ? <FaTimes /> : <GiAbstract009 />}
        </button>
    </nav>
  );
};

export default Navbar;
