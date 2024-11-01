import React, { useState, useEffect } from "react";

const ImageCarousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Function to move to the next slide
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  // Function to move to the previous slide
  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  // Auto slide effect every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000); // Change image every 5 seconds (5000ms)

    return () => clearInterval(interval); // Clear the interval when the component unmounts
  }, [images.length]);

  return (
    <div className="relative w-full mx-auto">
      {/* Previous Button */}
      <button
      style={{"opacity": "0"}}
        onClick={prevSlide}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition"
      >
        &#8592;
      </button>

      {/* Image Display */}
      <div className="overflow-hidden rounded-lg shadow-lg">
        <img
          src={images[currentIndex]}
          alt={`Slide ${currentIndex + 1}`}
          className="w-full h-64 object-cover transition-transform ease-in-out duration-500"
        />
      </div>

      {/* Next Button */}
      <button
      style={{"opacity": "0"}}
        onClick={nextSlide}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition"
      >
        &#8594;
      </button>

      {/* Dot Indicator */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
        {images.map((_, index) => (
          <div
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`cursor-pointer w-3 h-3 rounded-full ${
              currentIndex === index ? "bg-blue-500" : "bg-gray-300"
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default ImageCarousel;
