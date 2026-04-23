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
                Powered by <i><b><TypeWriter className="typewriter" words={['The Future', 'Coffee', 'React', 'Love']}/></b></i>
            </h1>

            <p>We are the Association for Computing Machinery at Missouri S&T. Our goal is to enrich the college experience and foster the next generation of innovators by hosting talks, competitions, and workshops. We take any and all majors interested in what we do. Checkout our SIGs to find out what might spark your interest!</p>

            {/* SOCIAL BUTTONS */}
            <div className='social-buttons'>
                <a href="https://www.instagram.com/mstacm?igsh=ZzJtd3dzYTQ2Y3F4" target="_blank" rel="noreferrer">
                    <FaInstagram />
                </a>
                <a href="https://discord.gg/ESbRUJmFrd" target="_blank" rel="noreferrer">
                    <FaDiscord />
                </a>
                <a href="https://github.com/mstacm" target="_blank" rel="noreferrer">
                    <FaGithub />
                </a>
                <a href="https://www.linkedin.com/company/sandtacm/posts/?feedView=all" target="_blank" rel="noreferrer">
                    <FaLinkedin />
                </a>
            </div>

        </div>
    </div>
    );
}

export default Header;
