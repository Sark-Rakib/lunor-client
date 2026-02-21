import React, { useState, useEffect } from "react";

const ImageCarousel = ({ images }) => {
  const [current, setCurrent] = useState(0);
  const length = images.length;

  // Auto-play every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % length);
    }, 5000);
    return () => clearInterval(interval);
  }, [length]);

  if (!Array.isArray(images) || images.length === 0) return null;

  return (
    <div className="relative w-full max-w-xl mx-auto">
      {/* Images */}
      <div className="overflow-hidden rounded-xl">
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`carousel-${index}`}
            className={`w-full h-80 sm:h-96 md:h-96 lg:h-96 object-contain transition-transform duration-500 ${
              index === current ? "block" : "hidden"
            }`}
          />
        ))}
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={() => setCurrent((current - 1 + length) % length)}
        className="absolute top-1/2 left-2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70"
      >
        &#10094;
      </button>
      <button
        onClick={() => setCurrent((current + 1) % length)}
        className="absolute top-1/2 right-2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70"
      >
        &#10095;
      </button>

      {/* Dots */}
      <div className="flex justify-center mt-2 gap-2">
        {images.map((_, index) => (
          <span
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-3 h-3 rounded-full cursor-pointer ${
              index === current ? "bg-blue-300" : "bg-gray-300"
            }`}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default ImageCarousel;
