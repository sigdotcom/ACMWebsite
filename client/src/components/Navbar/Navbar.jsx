import { Link } from "react-router-dom";
import "./Navbar.css"
import logo from '../../assets/acm-logo.png';
import { useState } from "react";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      {/* LEFT SIDE */}
      <div className="nav-left">
        <img src={logo} alt="logo" className="nav-logo"/>
        <div className="logo-text">
          <a href="#" className="acmLogo"> Missouri S&T ACM </a>
          <span className="tagline"> Powered by <i>the future</i></span>
        </div>
      </div>

      {/* HAMBURGER BUTTON */}
      <div className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? '✕' : '☰'}
      </div>

      {/* RIGHT SIDE */}
      <div className={`navLinks ${menuOpen ? 'open' : ''}`}>
        <ul className="links">
          <li><a href="#sigs" onClick={() => setMenuOpen(false)}>SIGs</a></li>
          <li><a href="#events" onClick={() => setMenuOpen(false)}>Events</a></li>
          <li><a href="#eboard" onClick={() => setMenuOpen(false)}>Eboard</a></li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;