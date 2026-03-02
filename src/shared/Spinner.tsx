"use client";
import React from "react";

const Spinner = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4 w-full bg-transparent rounded-xl">
      {/* Loading text with scale animation */}
      <div className="scale-pulse">
        <span className="text-2xl font-semibold text-gray-700">Loading...</span>
      </div>

      {/* Custom animation style */}
      <style jsx>{`
        @keyframes scalePulse {
          0%,
          100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.2);
          }
        }

        .scale-pulse {
          animation: scalePulse 1.5s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default Spinner;
