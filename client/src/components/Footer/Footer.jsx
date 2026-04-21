import { Link } from "react-router-dom";
import logo from "../../assets/acm-logo.png";
import "./Footer.css";

function Footer() {
  return (
  <footer className="footer">
    <div className="footer">
      <div className="footer-content">
        <img src={logo} alt="ACM logo" className="footer-logo" />
        <p className="footer-text"> @ Copyright 2026 Missouri S&T ACM . All rights reserved</p>
      </div>
    </div>
  </footer>
  );
}

export default Footer;

