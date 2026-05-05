import React from "react";
import { PiPhoneCallThin } from "react-icons/pi";
import { CiMail } from "react-icons/ci";
import { Link } from "react-router";

const TopNavbar = () => {
  return (
    <div className="bg-black backdrop-blur-sm border-b border-gray-800 text-gray-300">
      <div className="px-3 sm:px-8 md:px-6 lg:px-6">
        <div className="flex items-center justify-between h-10 text-xs sm:text-sm font-medium">
          {/* Left - Contact Info */}
          <div className="flex items-center gap-2 sm:gap-4 md:gap-8">
            <a
              href="tel:+8801745762857"
              className="flex items-center gap-1 hover:text-amber-300 transition-colors font-extralight text-[10px] sm:text-xs md:text-xs"
            >
              <PiPhoneCallThin className="text-[10px] font-extralight sm:text-xs md:text-xs" />
              01745-762857
            </a>

            <a
              href="mailto:wear.lunor@gmail.com"
              className="flex items-center gap-1 hover:text-amber-300 transition-colors font-extralight text-[10px] sm:text-xs md:text-xs"
            >
              <CiMail className="text-[10px] sm:text-xs md:text-xs" />
              <p className="sm:mb-1 md:mb-1">wear.lunor@gmail.com</p>
            </a>
          </div>

          {/* Right - Links */}
          <div className="flex items-center gap-2 sm:gap-4 md:gap-8">
            <Link
              to="/about"
              className="py-1.5 rounded-md hover:bg-gray-800 hover:text-amber-300 transition-colors font-extralight text-[10px] sm:text-xs md:text-xs"
            >
              About
            </Link>
            <Link
              to="/contact"
              className="py-1.5 rounded-md hover:bg-gray-800 hover:text-amber-300 transition-colors font-extralight text-[10px] sm:text-xs md:text-xs"
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopNavbar;
