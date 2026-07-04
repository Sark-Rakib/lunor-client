import { useState } from "react";

const ProductImages = ({ images }) => {
  const [activeImage, setActiveImage] = useState(0);

  if (!images || images.length === 0) return null;

  return (
    <div className="w-full sm:w-1/2 lg:w-1/2 mx-auto">
      {/* MAIN IMAGE */}
      <div className="relative w-full rounded overflow-hidden">
        <img
          src={images[activeImage]}
          alt="product"
          className="w-100 h-full lg:w-120 object-cover transition-all duration-500 hover:scale-105"
        />
      </div>

      {/* THUMBNAILS */}
      <div className="mt-4 flex gap-3 overflow-hidden scrollbar-hide">
        {images.slice(0, 3).map((img, index) => (
          <button
            key={index}
            onClick={() => setActiveImage(index)}
            className={`flex-shrink-0 w-20 h-20 md:w-24 md:h-24 rounded overflow-hidden border-2 transition-all duration-300
              ${
                activeImage === index
                  ? "border-black scale-105 shadow-md"
                  : "border-gray-200 opacity-70 hover:opacity-100"
              }`}
          >
            <img
              src={img}
              alt={`thumb-${index}`}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductImages;
