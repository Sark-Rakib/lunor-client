import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FaTruckFast } from "react-icons/fa6";

const OrderTruck = () => {
  const [screenWidth, setScreenWidth] = useState(0);

  useEffect(() => {
    setScreenWidth(window.innerWidth);
  }, []);

  return (
    <div className="relative w-full h-19 overflow-hidden">
      {/* Truck */}
      <motion.div
        className="absolute bottom-8 text-5xl"
        animate={{
          x: [-120, screenWidth + 120],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        <FaTruckFast />
      </motion.div>

      {/* Road */}
      <div className="absolute bottom-0 w-full h-10 bg-gray-800">
        {/* Moving dashed line */}
        <motion.div
          className="absolute top-1/2 left-0 w-[200%] border-t-4 border-dashed border-white"
          animate={{
            x: [0, -200],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        {/* Road shadow */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gray-600" />
      </div>
    </div>
  );
};

export default OrderTruck;
