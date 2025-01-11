import React, { useState, useEffect } from 'react';
import CarouselItem from './CarouselItem';
import { Package } from '../interfaces/bussinessModels';

interface CarouselProps {
  items: Package[];
}

const Carousel: React.FC<CarouselProps> = ({ items }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Function to handle the next image
  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
  };

  // Function to handle the previous image
  const prevImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + items.length) % items.length);
  };

  // Function to handle the dot click
  const handleDotClick = (index: number) => {
    setCurrentIndex(index);
  };

  // Auto-play functionality (change image every 3 seconds)
  useEffect(() => {
    if (!isHovered) {
      const intervalId = setInterval(() => {
        nextImage(); // Automatically go to the next image
      }, 3000); // 3 seconds

      // Clear the interval when the component unmounts or if paused
      return () => clearInterval(intervalId);
    }
  }, [isHovered, items.length]);

  // Handle hover state changes
  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  return (
    <div
      className="relative w-full max-w-4xl mx-auto"
      onMouseEnter={handleMouseEnter} // Pause auto-play on hover
      onMouseLeave={handleMouseLeave} // Resume auto-play on mouse leave
    >
      {/* Carousel Wrapper */}
      <div className="overflow-hidden relative">
        <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
          {items.map((item, index) => (
            <CarouselItem key={index} pack={item} />
          ))}
        </div>

        {/* Left Arrow */}
        <button
          onClick={prevImage}
          aria-label="Previous Image"
          className="carousel-arrow"
        >
          &#10094;
        </button>

        {/* Right Arrow */}
        <button
          onClick={nextImage}
          aria-label="Next Image"
          className="carousel-arrow right-0"
        >
          &#10095;
        </button>
      </div>

      {/* Dots for Navigation */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {items.map((_, index) => (
          <span
            key={index}
            onClick={() => handleDotClick(index)}
            aria-label={`Go to slide ${index + 1}`}
            className={`carousel-dot ${currentIndex === index ? 'carousel-dot-active' : 'carousel-dot-inactive'}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;


