import React from 'react';

const LoadingSpinner = ({ message = "Loading combat intel...", size = "md" }) => {
  const sizeClasses = {
    sm: "w-6 h-6 border-2",
    md: "w-10 h-10 border-3",
    lg: "w-16 h-16 border-4",
  };

  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 space-y-4">
      <div className="relative">
        <div
          className={`${sizeClasses[size] || sizeClasses.md} rounded-full border-red-500/20 border-t-red-500 animate-spin`}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
        </div>
      </div>
      {message && (
        <p className="text-gray-400 text-sm font-medium tracking-wide animate-pulse">
          {message}
        </p>
      )}
    </div>
  );
};

export default LoadingSpinner;
