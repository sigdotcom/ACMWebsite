import { Link } from "react-router-dom";
import "./Navbar.css" 
import logo from '../../assets/acm-logo.png';

import { useState } from "react";

function Navbar() {


  return (
    <nav className="navbar">
      {/* LEFT SIDE */}
      <div className="nav-left">
        <img src="src/assets/acm-logo.png" alt="logo"className="nav-logo"/> 
        <div className="logo-text" >
            <a href="#" className="acmLogo"> Missouri S&T ACM </a>
            <span className="tagline"> Powered by <i>the future</i></span>
        </div>
      </div>




      {/* RIGHT SIDE */}
      <div className="navLinks">
        <ul className="links">
          <li><a href="#events">Events</a></li>
          <li> <a href="#sigs">SIGs</a> </li>
          <li><a href="#eboard">Eboard</a></li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;

























/*
function Navbar () {
  return (
    // navbar material
    <nav>
        <div className="navbar">
        
            <div class="acmLogo"><a href="#"> Missouri S&T </a> </div>
            <div class="navLinks">
                <ul class="links">           
                    <li><a href="#">Events</a></li>
                    <li>
                        <a href="#">SIGs</a>
                        <i class='bx bxs-chevron-down arrow' ></i>
                    </li>
                    <li><a href="#">Eboard</a></li>
                </ul>

            </div>
        </div>
    </nav> 
  );
}

export default Navbar;
*/