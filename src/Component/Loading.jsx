// src/components/FancyLoader.jsx
import React from "react";

const Loading = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="relative flex flex-col items-center gap-6">
        {/* Rotating rings */}
        <div className="relative w-24 h-24">
          <span className="absolute w-full h-full rounded-full border-2 border-gray-700 border-t-amber-400 animate-spin-slow"></span>
          <span className="absolute w-16 h-16 rounded-full border-2 border-gray-700 border-b-yellow-400 animate-spin-slow-reverse"></span>
        </div>

        {/* Brand Text */}
        <h1 className="text-3xl md:text-5xl font-extrabold text-transparent bg-clip-text animate-brand-glow">
          LUNOR <br /> <span className="text-sm">EST. VINTAGE</span>
        </h1>
      </div>

      <style>
        {`
          @keyframes spin-slow {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          @keyframes spin-slow-reverse {
            0% { transform: rotate(360deg); }
            100% { transform: rotate(0deg); }
          }
          .animate-spin-slow { animation: spin-slow 3s linear infinite; }
          .animate-spin-slow-reverse { animation: spin-slow-reverse 2.5s linear infinite; }

          @keyframes brandGlow {
            0%, 100% { opacity: 0.3; transform: scale(0.95); }
            50% { opacity: 1; transform: scale(1.05); }
          }
          .animate-brand-glow {
            background-image: linear-gradient(90deg, #f59e0b, #fcd34d, #fbbf24);
            background-size: 200% 200%;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            animation: brandGlow 2s ease-in-out infinite alternate;
          }
        `}
      </style>
    </div>
  );
};

export default Loading;
