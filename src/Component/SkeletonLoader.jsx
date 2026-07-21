import React from "react";

const SkeletonLoader = () => {
  return (
    <div className="overflow-hidden rounded border border-gray-100 bg-white">
      {/* Image */}
      <div className="relative h-55 sm:h-65 md:h-80 bg-gray-100 flex items-center justify-center overflow-hidden animate-pulse">
        {/* Brand */}
        <div className="relative text-center select-none">
          <h2 className="inline-flex items-center justify-center px-6 py-2 text-3xl md:text-4xl font-extrabold tracking-[0.25em] text-gray-300">
            LUNOR
          </h2>

          <p className="mt-2 text-[10px] md:text-xs p-2 uppercase text-gray-400">
            — EST. VINTAGE —
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        {/* Title */}
        <div className="h-4 w-3/4 rounded bg-gray-200 animate-pulse"></div>

        {/* Price */}
        <div className="flex justify-between items-center gap-2">
          <div className="h-4 w-20 rounded bg-gray-200 animate-pulse"></div>
          <div className="h-4 w-16 rounded bg-gray-200 animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonLoader;
