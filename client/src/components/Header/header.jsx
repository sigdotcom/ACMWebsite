import { Link } from "react-router-dom";
import "./header.css";
import tempHeader from '../../assets/tempHeader.png';
import TypeWriter from "../../components/TypeWriter";
import {FaDiscord, FaInstagram, FaGithub, FaLinkedin} from 'react-icons/fa';


//add this back in once nav+footer are complete
/*  Powered by <TypeWriter className="typewriter" words={['the future', 'coffee', 'react', 'love']}/> */

function Header() {
  //default style

  return (
    // navbar material
    <div className="header-container">
        <div className="header-content">
            <h1>
                Powered by <TypeWriter className="typewriter" words={['the future', 'coffee', 'react', 'love']}/>
            </h1>

            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. 
            </p>

            {/* SOCIAL BUTTONS */}
            <div className='social-buttons'>
                <a href="https://instagram.com" target="_blank" rel="noreferrer">
                    <FaInstagram />
                </a>
                <a href="https://discord.com" target="_blank" rel="noreferrer">
                    <FaDiscord />
                </a>
                <a href="https://github.com" target="_blank" rel="noreferrer">
                    <FaGithub />
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noreferrer">
                    <FaLinkedin />
                </a>
            </div>

        </div>
    </div>
  );
}

export default Header;
