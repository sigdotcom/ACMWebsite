import "./sigcard.css";

function SigCard() {
  return(
    <div className = "card-container">
      <div className = "sig-box hack">
        <img src="src/assets/acm_hack_logo.png" alt="ACM Hack logo" />
        <h1>ACM Hack</h1>
      </div>
      <div className = "sig-box security">
        <img src="src/assets/ACM_Security_Logo.png" alt="ACM Security logo" />
        <h1>ACM Security</h1>
      </div>
      <div className = "sig-box data">
        <img src="src/assets/ACM_AIData_Logo.png" alt="ACM AI logo" />
        <h1>ACM AI</h1>
      </div>
      <div className = "sig-box web">
        <img src="src/assets/acm_web_logo.png" alt="ACM Web logo" />
        <h1>ACM Web</h1>
      </div>
      <div className = "sig-box game">
        <img src="src/assets/acm_gamedev_logo.png" alt="ACM Game logo" />
        <h1>ACM Game</h1>
      </div>
      <div className = "sig-box comp">
        <img src="src/assets/acm_comp_logo_trans.png" alt="ACM Comp logo" />
        <h1>ACM Comp</h1>
      </div>
    
    </div>
  )
}
// xD

export default SigCard;