import { useState, useEffect } from 'react'
import '../component-styles/card.css'

//title of sig card
//description of sig
//buttons for discord, website, etc

function Card({className = "", header = "", body = "", logo = ""}){
    const [displayText, setDisplayText] = useState("");

    if (className = "sig-card"){
        return (
            <>
                <div class = ".sig-card">
                    <div>
                        <h1>{header}</h1>
                        <p>{body}</p>
                    </div>

                </div>
            </>
        )
    }
    else if (className = "event"){
        return (
            <>
                <div>
                    <div>
                        

                    </div>
                </div>
            </>
        )
    }
}

export default Card;