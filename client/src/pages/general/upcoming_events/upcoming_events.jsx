import React, { useState, useEffect } from 'react';
import EventPopup from './event_popup/event_popup';
import eventsData from './events.json';
import './upcoming_events.css';
import { ArrowLeft, ArrowRight } from 'lucide-react';

function UpcomingEvent() {
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [cardsToShow, setCardsToShow] = useState(4);

    // Get today's date and set the time to exactly midnight
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Filter out past events
    const activeEvents = eventsData
        .filter(event => new Date(event.date) >= today)
        .sort((a, b) => new Date(a.date) - new Date(b.date));

    // Update cardsToShow based on window width
    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            if (width <= 820) {
                setCardsToShow(1);
            } else if (width <= 1240) {
                setCardsToShow(2);
            } else if (width <= 1600) {
                setCardsToShow(3);
            } else {
                setCardsToShow(4); // Only show 4 if the screen is wide enough
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Important: Calculate maxIndex based on current cardsToShow
    const maxIndex = Math.max(0, activeEvents.length - cardsToShow);

    // Ensure currentIndex doesn't go out of bounds when resizing from mobile to desktop
    useEffect(() => {
        if (currentIndex > maxIndex) {
            setCurrentIndex(maxIndex);
        }
    }, [maxIndex, currentIndex]);

    const handleNext = () => {
        if (currentIndex < maxIndex) {
            setCurrentIndex(prev => prev + 1);
        }
    };

    const handlePrev = () => {
        if (currentIndex > 0) {
            setCurrentIndex(prev => prev - 1);
        }
    };

    return (
        <div className="upcoming-events-section">
            <h1 className="events-main-title">Upcoming Events</h1>

            <div className="carousel-wrapper">
                <div className="carousel-window">
                    <div
                        className="carousel-track"
                        style={{ transform: `translateX(calc(-${currentIndex} * 25.625rem))` }}
                    >
                        {activeEvents.map((event) => (
                            <div
                                key={event.id}
                                className="event-card"
                                onClick={() => setSelectedEvent(event)}
                            >
                                <div className="event-card-content">
                                    <div className="calendar-icon">
                                        <div className="calendar-month">{event.month}</div>
                                        <div className="calendar-day">{event.day}</div>
                                    </div>
                                    <div className="event-card-text">
                                        <h3 className="event-card-title">{event.title}</h3>
                                    </div>
                                </div>
                                <p className="event-card-description">
                                    {event.description.length > 50
                                        ? event.description.substring(0, 50) + '...'
                                        : event.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="carousel-controls">
                <button
                    className="arrow-btn"
                    onClick={handlePrev}
                    disabled={currentIndex === 0}
                >
                    <ArrowLeft size={32} strokeWidth={3} />
                </button>
                <button
                    className="arrow-btn"
                    onClick={handleNext}
                    disabled={currentIndex >= maxIndex}
                >
                    <ArrowRight size={32} strokeWidth={3} />
                </button>
            </div>

            {selectedEvent && (
                <EventPopup
                    event={selectedEvent}
                    onClose={() => setSelectedEvent(null)}
                />
            )}
        </div>
    );
}

export default UpcomingEvent;