import { useState, useEffect } from "react";

function TypeWriter({ words = [], typeCursorClassName = "", className = "", typingSpeed = 100, deletingSpeed = 90, pauseTime = 2000}){
    const [wordIndex, setWordIndex] = useState(0);
    const [displayText, setDisplayText] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const currentWord = words[wordIndex];

        let timeout;

        if (!isDeleting && displayText.length < currentWord.length) {
            // Typing
            timeout = setTimeout(() => {
                setDisplayText(currentWord.slice(0, displayText.length + 1));
            }, typingSpeed);
        }
        else if (!isDeleting && displayText.length === currentWord.length) {
            // Pause when finished typing
            timeout = setTimeout(() => setIsDeleting(true), pauseTime);
        }
        else if (isDeleting && displayText.length > 0) {
            // Deleting
            timeout = setTimeout(() => {
                setDisplayText(currentWord.slice(0, displayText.length - 1));
            }, deletingSpeed);
        }
        else if (isDeleting && displayText.length === 0) {
            // Move onto next word 
            setIsDeleting(false);
            setWordIndex((prev) => (prev + 1) % words.length);
        }

        return () => clearTimeout(timeout); 
    }, [displayText, isDeleting, wordIndex, words, typingSpeed, deletingSpeed, pauseTime]);
    return <span className = {className}>{displayText}<span className = {typeCursorClassName}>|</span></span>;

}

export default TypeWriter;