import { useState } from "react";
import "./sigcard.css";

function FlipCard({ className, imgSrc, imgAlt, label, description}) {
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
          <p>{description}</p>
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
        <FlipCard className="hack"     imgSrc="src/assets/acm_hack_logo.png"     imgAlt="ACM Hack logo"     label="ACM Hack"     description="ACM Hack introduces students to the world of hackathons: weekend long events where students come together to turn ideas into reality. Hours of coding, real world experience, and lots of energy drinks." />
        <FlipCard className="security" imgSrc="src/assets/ACM_Security_Logo.png" imgAlt="ACM Security logo" label="ACM Security" description="ACM Security is S&T's largest student collection of cybersecurity enthusiasts. Students learn about all things security through hands-on teaching, from clandestine code to real lock picking sessions." />
        <FlipCard className="data"     imgSrc="src/assets/ACM_AIData_Logo.png"   imgAlt="ACM AI logo"       label="ACM AI"       description="ACM AI is an AI & Data focused sig covering hot topics like Machine Learning, Neural Networks, and LLMs. AI is all over the world and provides excellent deep concepts to learn." />
        <FlipCard className="web"      imgSrc="src/assets/acm_web_logo.png"      imgAlt="ACM Web logo"      label="ACM Web"      description="ACM Web is perfect for those interested in web development and software engineering. From real projects to web concepts, students gain hands on experience making projects of their own & with their peers." />
        <FlipCard className="game"     imgSrc="src/assets/acm_game_logo.png"     imgAlt="ACM Game logo"     label="ACM Game"     description="ACM Game focuses on improving and utilizing technical and soft skills to create a game for the community's arcade machines on campus. Through ACM Game, students will learn to code games and make them their own." />
        <FlipCard className="comp"     imgSrc="src/assets/acm_comp_logo.png"     imgAlt="ACM Comp logo"     label="ACM Comp"     description="ACM Competition focuses on competitive programming, a mindsport in which computer science problems such as LeetCode are solved as quickly as possible. Solving these problems is a great way to keep problem solving strong and consistent." />
      </div>
    </div>
    
  );
}

export default SigCard;