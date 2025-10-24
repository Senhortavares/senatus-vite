/* global __BUILD_VERSION__, __BUILD_TIME__, __BUILD_COMMIT__ */
import { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import "./navbar.css";
import { links } from "../data.jsx";
import { GiAbstract009 } from "react-icons/gi";
import { FaTimes } from "react-icons/fa";

/*  versão automática injetada pelo Vite */
const CURRENT_VERSION =
  typeof __BUILD_VERSION__ !== "undefined"
    ? __BUILD_VERSION__
    : "dev-" + new Date().toISOString();

const Navbar = () => {
  const [isNavShowing, setIsNavShowing] = useState(false);
  const [updates, setUpdates] = useState({});
  const location = useLocation();

  /*  debug do build */
  useEffect(() => {
    console.groupCollapsed("%c SENATUS - Build", "color: gold; font-weight: bold;");
    console.log("Versão:", CURRENT_VERSION);
    console.log("Commit:", typeof __BUILD_COMMIT__ !== "undefined" ? __BUILD_COMMIT__ : "dev");
    console.log("Gerado em:", typeof __BUILD_TIME__ !== "undefined" ? __BUILD_TIME__ : new Date().toISOString());
    console.groupEnd();
  }, []);

  /*  Define páginas com atualização */
  useEffect(() => {
    const storedVersion = localStorage.getItem("senatus_version");
    const storedUpdates = JSON.parse(localStorage.getItem("senatus_updates") || "{}");

    if (storedVersion !== CURRENT_VERSION) {
      const newUpdates = {};
      links.forEach(({ path }) => {
        newUpdates[path] = true;
      });

      setUpdates(newUpdates);
      localStorage.setItem("senatus_updates", JSON.stringify(newUpdates));
      localStorage.setItem("senatus_version", CURRENT_VERSION);
    } else {
      setUpdates(storedUpdates);
    }
  }, []);

  /*  Remove bolinha ao entrar na página */
  useEffect(() => {
    const path = location.pathname;
    if (updates[path]) {
      const newUpdates = { ...updates, [path]: false };
      setUpdates(newUpdates);
      localStorage.setItem("senatus_updates", JSON.stringify(newUpdates));
    }
  }, [location.pathname]);

  /* verifica se há alguma atualização global */
  const hasAnyUpdate = Object.values(updates).some(Boolean);

  return (
    <nav className={hasAnyUpdate ? "nav--updated" : ""}>
      <div className="nav__container">
        {/* Logo */}
        <Link to="/" className="logo" onClick={() => setIsNavShowing(false)}>
          <img src="/logo.png" alt="Logo do site" />
        </Link>

        {/* Overlay (menu mobile) */}
        {isNavShowing && (
          <div className="nav__overlay" onClick={() => setIsNavShowing(false)}></div>
        )}

        {/* Links */}
        <ul className={`nav__link ${isNavShowing ? "show_nav" : ""}`}>
          {links.map(({ name, path }, index) => (
            <li
              key={path}
              style={{ animationDelay: `${index * 0.1}s` }}
              className={isNavShowing ? "fade-in" : ""}
            >
              <NavLink
                to={path}
                className={({ isActive }) => (isActive ? "active-nav" : "")}
                onClick={() => setIsNavShowing(false)}
              >
                {name}
                {updates[path] && <span className="nav__dot" />}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Botão menu (muda de cor e brilha se tiver update) */}
        <button
          className={`nav__toggle-boton ${hasAnyUpdate ? "nav__toggle--updated" : ""}`}
          onClick={() => setIsNavShowing(!isNavShowing)}
          aria-label="Abrir/fechar menu"
        >
          {isNavShowing ? <FaTimes /> : <GiAbstract009 />}
          {hasAnyUpdate && <span className="nav__dot" />}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
