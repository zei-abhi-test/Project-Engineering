import React from "react";

const SkeletonCard = ({ count = 4 }) => {
  return (
    <div className="grid gap-4">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="bg-white border border-gray-200 rounded-lg p-4 animate-pulse"
        >
          <div className="h-5 w-1/3 bg-gray-200 rounded mb-4"></div>

          <div className="h-4 w-2/3 bg-gray-200 rounded mb-2"></div>

          <div className="h-4 w-1/2 bg-gray-200 rounded"></div>
        </div>
      ))}
    </div>
  );
};

export default SkeletonCard;