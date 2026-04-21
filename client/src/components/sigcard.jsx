import { useState } from "react";
import "./sigcard.css";

function FlipCard({ className, imgSrc, imgAlt, label }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className={`card-wrapper ${flipped ? "flipped" : ""}`}
      onClick={() => setFlipped(!flipped)}
      style={{ perspective: "1000px" }}
    >
      <div className="card-inner">
        {/* Front */}
        <div className={`sig-box card-front ${className}`}>
          <img src={imgSrc} alt={imgAlt} />
          <h1>{label}</h1>
        </div>
        {/* Back */}
        <div className={`sig-box card-back ${className}`}>
          <h1>{label}</h1>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis optio nam, nostrum beatae iure exercitationem ea soluta nobis dicta excepturi, eius, corrupti consequuntur esse ipsum quibusdam voluptatum debitis aut dignissimos?</p>
        </div>
      </div>
    </div>
  );
}

function SigCard() {
  return(
    <div className="sigcard">
      <h1>SIGs</h1>
      <div className="card-container">
        <FlipCard className="hack"     imgSrc="src/assets/acm_hack_logo.png"     imgAlt="ACM Hack logo"     label="ACM Hack"     />
        <FlipCard className="security" imgSrc="src/assets/ACM_Security_Logo.png" imgAlt="ACM Security logo" label="ACM Security" />
        <FlipCard className="data"     imgSrc="src/assets/ACM_AIData_Logo.png"   imgAlt="ACM AI logo"       label="ACM AI"       />
        <FlipCard className="web"      imgSrc="src/assets/acm_web_logo.png"      imgAlt="ACM Web logo"      label="ACM Web"      />
        <FlipCard className="game"     imgSrc="src/assets/acm_game_logo.png"     imgAlt="ACM Game logo"     label="ACM Game"     />
        <FlipCard className="comp"     imgSrc="src/assets/acm_comp_logo.png"     imgAlt="ACM Comp logo"     label="ACM Comp"     />
      </div>
    </div>
    
  );
}

export default SigCard;