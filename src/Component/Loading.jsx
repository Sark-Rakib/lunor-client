import React from "react";

const Loading = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-white dark:bg-black">
      <div className="flex flex-col items-center">
        {/* Top Label */}
        <div className="flex items-center gap-3 mb-5">
          <span className="w-8 h-px bg-neutral-400 dark:bg-neutral-600" />
          <span className="text-[10px] tracking-[0.5em] text-neutral-500 dark:text-neutral-400">
            PREMIUM COLLECTION
          </span>
          <span className="w-8 h-px bg-neutral-400 dark:bg-neutral-600" />
        </div>

        {/* Brand Name */}
        <h1 className="text-7xl sm:text-8xl md:text-9xl font-black tracking-[0.16em] text-black dark:text-white animate-lunor-fade">
          LUNOR
        </h1>

        {/* Decorative Line */}
        <div className="w-24 h-px bg-neutral-300 dark:bg-neutral-700 my-5" />

        {/* Brand Subtitle */}
        <p className="text-[11px] tracking-[0.6em] font-medium text-neutral-500 dark:text-neutral-400">
          EST. VINTAGE
        </p>
      </div>

      <style>
        {`
          @keyframes lunorFade {
            0%, 100% {
              opacity: 0.12;
            }
            50% {
              opacity: 1;
            }
          }

          .animate-lunor-fade {
            animation: lunorFade 2.5s ease-in-out infinite;
          }

          @media (prefers-reduced-motion: reduce) {
            .animate-lunor-fade {
              animation: none;
              opacity: 1;
            }
          }
        `}
      </style>
    </div>
  );
};

export default Loading;
