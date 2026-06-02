import { Link } from "react-router";
import { motion } from "framer-motion";

const Logo = () => {
  return (
    <Link
      to="/"
      className="flex ml-22 sm:ml-63 md:ml-0 md:justify-start items-center w-full"
    >
      <div className="flex flex-col items-center md:items-start leading-1">
        {/* LUNOR - breathing animation */}
        <motion.h1 className="text-2xl font-semibold tracking-[5px]">
          LUNOR
        </motion.h1>

        {/* EST VINTAGE - subtle floating */}
        <motion.p
          className="text-[8px] tracking-[6px] mt-1 relative"
          animate={{
            opacity: [0.6, 1, 0.6],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          EST VINTAGE
          {/* moving underline */}
          <motion.span
            className="absolute left-0 bottom-[-3px] h-[1px] bg-gray-400"
            animate={{
              width: ["0%", "60%", "0%"],
              opacity: [0.3, 1, 0.3],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.p>
      </div>
    </Link>
  );
};

export default Logo;
