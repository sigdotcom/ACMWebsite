import { useState, useEffect } from "react";

function TypeWriter({ words = [], className = "", typingSpeed = 40, deletingSpeed = 50, pauseTime = 4000}){
    const [wordIndex, setWordIndex] = useState(0);
    const [displayText, setDisplayText] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const currentWord = words[wordIndex];

        let timeout;

        if (!isDeleting && displayText.length < currentWord.length) {
            //typing 
            timeout = setTimeout(() => {
                setDisplayText(currentWord.slice(0, displayText.length + 1));
            }, typingSpeed);
        }
        else if (!isDeleting && displayText.length === currentWord.length){
            //Pause when finished typing
            timeout = setTimeout(() => setIsDeleting(true), pauseTime);
        }
        else if (isDeleting && displayText.length > 0){
            //Deleting
            timeout = setTimeout(() => {
                setDisplayText(currentWord.slice(0, displayText.length - 1));
            }, deletingSpeed);
        }
        else if (isDeleting && displayText.length === 0) {
            //Move onto next word chud
            setIsDeleting(false);
            setWordIndex((prev) => (prev + 1) % words.length);
        }

        return () => clearTimeout(timeout); }, [displayText, isDeleting, wordIndex, words, typingSpeed, deletingSpeed, pauseTime]);
    return <span className={className}>{displayText}<span>|</span></span>
}

export default TypeWriter;