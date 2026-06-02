import React from "react";

const SkeletonLoader = () => {
  return (
    <div className="overflow-hidden rounded border border-gray-100 bg-white">
      {/* Image */}
      <div className="h-55 sm:h-65 md:h-80 bg-gray-200 animate-pulse"></div>

      {/* Content */}
      <div className="p-4 space-y-3">
        {/* Name */}
        <div className="h-4 w-3/4 bg-gray-200 animate-pulse rounded"></div>

        {/* Price row */}
        <div className="flex justify-between items-center">
          {/* Main Price */}
          <div className="h-4 w-20 bg-gray-200 animate-pulse rounded"></div>

          {/* Discount Price */}
          <div className="h-4 w-16 bg-gray-200 animate-pulse rounded"></div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonLoader;
