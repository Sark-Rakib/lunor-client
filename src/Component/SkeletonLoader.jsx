import React from "react";

const SkeletonLoader = () => {
  return (
    <div>
      <div className="bg-indigo-50 p-6 rounded-xl shadow animate-pulse">
        <div className="w-24 h-24 rounded-full mx-auto mb-4 bg-gray-300"></div>
        <div className="h-6 w-32 mx-auto mb-2 bg-gray-300 rounded"></div>
        <div className="h-4 w-24 mx-auto mb-4 bg-gray-300 rounded"></div>
        <div className="h-10 w-24 mx-auto bg-gray-300 rounded"></div>
      </div>
    </div>
  );
};

export default SkeletonLoader;
