import React from 'react'
import "./qoutes.css"


function Quotes() {

    const quotes = [
        "The only limit to our realization of tomorrow is our doubts of today.",
        "The future belongs to those who believe in the beauty of their dreams.",
        "Do not watch the clock. Do what it does. Keep going.",
        "Keep your face always toward the sunshine—and shadows will fall behind you.",
        "Success is not how high you have climbed, but how you make a positive difference to the world."
      ];

      const [currentIndex, setCurrentIndex] = useState(0);

      const goToNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % quotes.length);
      };
    
      const goToPrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + quotes.length) % quotes.length);
      };
    
    

  return (
    <div className='qLayout'>Quotes</div>
  )
}

export default Quotes