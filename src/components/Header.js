import React, { useState, useRef, useEffect } from "react";
import { FaUser } from "react-icons/fa";
import { Link as ScrollLink } from "react-scroll";
import "./Header.css";
import Logo from "./Logo/Meteo.jpg";

const Header = () => {
  const [loginOpen, setLoginOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const loginRef = useRef(null);
  const menuRef = useRef(null);

  const handleOutsideClick = (event) => {
    if (loginRef.current && !loginRef.current.contains(event.target)) {
      setLoginOpen(false);
    }
    if (
      menuRef.current &&
      !menuRef.current.contains(event.target) &&
      !event.target.classList.contains("mobile-menu-toggle")
    ) {
      setMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const handleMenuClick = () => {
    setMenuOpen(false);
  };

  return (
    <header className="header">
      <div className="header-left">
        <img src={Logo} alt="Meteo Logo" className="logo" />
        <button
          className={`mobile-menu-toggle ${menuOpen ? "open" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          Menu
        </button>
      </div>
      <nav
        ref={menuRef}
        className={`header-navigation ${menuOpen ? "mobile-menu" : ""}`}
      >
        <ScrollLink
          to="home"
          smooth={true}
          duration={500}
          className="nav-link"
          onClick={handleMenuClick}
        >
          Home
        </ScrollLink>
        <ScrollLink
          to="weather-forecast"
          smooth={true}
          duration={500}
          className="nav-link"
          onClick={handleMenuClick}
        >
          Previsioni
        </ScrollLink>
        <ScrollLink
          to="news"
          smooth={true}
          duration={500}
          className="nav-link"
          onClick={handleMenuClick}
        >
          News
        </ScrollLink>
        <ScrollLink
          to="contacts"
          smooth={true}
          duration={500}
          className="nav-link"
          onClick={handleMenuClick}
        >
          Contatti
        </ScrollLink>
        <div className="mobile-login">
          {menuOpen && (
            <div className="login-dropdown" ref={loginRef}>
              <form className="login-form">
                <input type="text" placeholder="Login" />
                <input type="password" placeholder="Password" />
                <button type="submit">Invia</button>
              </form>
            </div>
          )}
        </div>
      </nav>
      <div className="header-right">
        <button className="login-icon" onClick={() => setLoginOpen(!loginOpen)}>
          <FaUser className="logo-icon2" />
          Accedi
        </button>
        {loginOpen && (
          <div className="login-dropdown" ref={loginRef}>
            <form className="login-form">
              <input type="text" placeholder="Login" />
              <input type="password" placeholder="Password" />
              <button type="submit">Invia</button>
            </form>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
