import React from "react";
import "./Footer.css";
import {
  FaEnvelope,
  FaPhone,
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaMapMarkerAlt,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer id="contacts" className="footer">
      <div className="footer-section contacts">
        <h3>Contatti</h3>
        <p>
          <FaEnvelope /> Email:{" "}
          <a href="mailto:info@che-tempoche-fa.it">info@che-tempoche-fa.it</a>
        </p>
        <p>
          <FaPhone /> Telefono: <a href="tel:+391234567890">+39 123 456 7890</a>
        </p>
        <p>
          <FaMapMarkerAlt /> Indirizzo: Via Esempio, 123, Roma, Italia
        </p>
      </div>
      <div className="footer-section social-media">
        <h3>Seguici su</h3>
        <div className="social-icons">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
          >
            <FaFacebook />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Twitter"
          >
            <FaTwitter />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
          >
            <FaInstagram />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
          >
            <FaLinkedin />
          </a>
        </div>
      </div>
      <div className="footer-section credits">
        <p>&copy; 2024 Che Tempo Che Fa. Tutti i diritti riservati.</p>
        <p>
          Sito sviluppato da <a href="#">Giovanni Sampognaro</a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
