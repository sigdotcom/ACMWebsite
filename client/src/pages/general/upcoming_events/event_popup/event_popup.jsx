import React from 'react';
import { motion } from 'framer-motion';
import './event_popup.css';

function EventPopup({ event, onClose }) {
    if (!event) return null;

    // Close the modal if the user clicks the dark overlay background
    const handleOverlayClick = (e) => {
        if (e.target.className === 'popup-overlay') {
            onClose();
        }
    };

    return (
        // Animate the dark overlay fading in
        <motion.div
            className="popup-overlay"
            onClick={handleOverlayClick}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            {/* Animate the actual modal scaling up and fading in */}
            <motion.div
                className="popup-content"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
            >
                <button className="close-btn" onClick={onClose}>&times;</button>

                <div className="popup-split">
                    {/* Left Column: Text Info */}
                    <div className="popup-info">
                        <h2 className="popup-title">{event.title}</h2>

                        <div className="popup-details">
                            <p><strong>Date:</strong> {event.date}</p>
                            <p><strong>Time:</strong> {event.time}</p>
                            <p><strong>Location:</strong> {event.location}</p>
                            <p><strong>Contact info:</strong> {event.contact}</p>
                        </div>

                        {/* Scrollable container for the description */}
                        <div className="popup-description-container">
                            <p className="popup-description">{event.description}</p>
                        </div>

                        {event.registrationLink && (
                            <a
                                href={event.registrationLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="register-btn"
                            >
                                Register Here
                            </a>
                        )}
                    </div>

                    {/* Right Column: Poster Image */}
                    <div className="popup-image-wrapper">
                        <div className="popup-image-container">
                            <img src={event.posterImage} alt={`${event.title} poster`} className="popup-image" />
                        </div>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}

export default EventPopup;