import React, { useEffect, useState } from 'react'
import "./qoutes.css"


function Quotes({color}) {

    const quotes = [
        "The only limit to our realization of tomorrow is our doubts of today.",
        "The future belongs to those who believe in the beauty of their dreams.",
        "Do not watch the clock. Do what it does. Keep going.",
        "Keep your face always toward the sunshine—and shadows will fall behind you.",
        "Success is not how high you have climbed, but how you make a positive difference to the world."
      ];

      const [currentIndex, setCurrentIndex] = useState(0);
      const [fadeIn, setFadeIn] = useState(true);
      const goToNext = () => {
        setFadeIn(false);
        setTimeout(() => {
          setCurrentIndex((prevIndex) => (prevIndex + 1) % quotes.length);
          setFadeIn(true);
        }, 500); // Delay for fade-out effect
      };
    
  // Function to go to the previous quote
  const goToPrev = () => {
    setFadeIn(false);
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex - 1 + quotes.length) % quotes.length);
      setFadeIn(true);
    }, 500); // Delay for fade-out effect
  };

  // Autoplay: Automatically go to the next quote every 3 seconds
  useEffect(() => {
    const intervalId = setInterval(goToNext, 3000);
    return () => clearInterval(intervalId); // Clear interval on component unmount
  }, []);

  
      return (
        <div className='cc_section'>
<div className="carousel-container">
      {/* Quote Display */}
      <div className={`quote-card ${fadeIn ? 'fade-in' : 'fade-out'}`}>
        <p className="quote-text" style={{color:`${color}`}}>"{quotes[currentIndex]}"</p>
      </div>

      {/* Buttons */}
      <div className="carousel-controls">
        <button style={{color:`${color}`}} className="carousel-button" onClick={goToPrev}>Prev</button>
        <button style={{color:`${"color"}`}} className="carousel-button" onClick={goToNext}>Next</button>
      </div>
    </div>
        </div>

      );
}

export default Quotes