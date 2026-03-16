// src/components/ProductCard.jsx
import React from "react";
import { Link } from "react-router";

const ProductCard = ({ tuition }) => {
  const {
    _id,
    name,
    // category,
    price,
    images,
    discountPrice,
    ability,
    description,
    studentName,
    // postedAt,
    // status = "Pending",
  } = tuition;

  //   const formatDate = (dateString) => {
  //     const date = new Date(dateString);
  //     return date.toLocaleDateString("en-GB", {
  //       day: "numeric",
  //       month: "short",
  //       year: "numeric",
  //     });
  //   };

  const shortDescription =
    description?.slice(0, 45) + (description?.length > 45 ? "..." : "");

  return (
    <Link
      to={`/products-details/${_id}`}
      className="transition-all duration-300 overflow-hidden flex flex-col h-full"
    >
      {/* Image */}
      <div className="relative">
        <img
          src={images[0] || "https://i.ibb.co/4p0jH0Z/default-avatar.jpg"}
          alt={studentName || name}
          className="w-full h-55 sm:h-65 md:h-80 hover:scale-105 transition-transform duration-300"
        />
        {/* Status Badge */}
        <div
          className="absolute top-3 right-3 px-3 py-1 rounded-full text-white text-xs font-semibold
            bg-gray-600"
        >
          {ability}
        </div>
      </div>

      {/* Card Body */}
      <div className="mt-1 flex-1 flex flex-col justify-between">
        <div>
          <h2 className="text-sm md:text-base font-bold">{name}</h2>
          {/* <div className="flex flex-wrap justify-between text-sm">
            <h1 className="text-black">Category :</h1>
            <h2 className=" text-gray-800">{category}</h2>
          </div> */}
          {/* price */}
          <div className="flex flex-wrap items-center justify-between mt-1">
            {discountPrice ? (
              <>
                <span className="text-sm">Price : ৳{discountPrice}</span>
                <span className="text-red-400 line-through text-sm">
                  ৳{price}
                </span>
              </>
            ) : (
              <span className="text-sm">Price : ৳{price}</span>
            )}
          </div>
          <p className="text-sm">{shortDescription}</p>
        </div>

        {/* <Link
          to={`/products-details/${_id}`}
          className="mt-4 block text-center bg-gray-600 hover:bg-gray-400 text-white py-2 rounded font-semibold transition-all"
        >
          View Details
        </Link> */}
      </div>

      {/* <div className="p-2 text-right text-xs text-gray-400">
        Posted: {formatDate(postedAt)}
      </div> */}
    </Link>
  );
};

export default ProductCard;
