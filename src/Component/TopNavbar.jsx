import React from "react";
import { FaPhone, FaEnvelope } from "react-icons/fa"; // Changed FaMailBulk → FaEnvelope (more standard)
import { Link } from "react-router"; // corrected import

const TopNavbar = () => {
  return (
    <div className="bg-gray-900/95 backdrop-blur-sm border-b border-gray-800 text-gray-300">
      <div className="px-3 sm:px-8 md:px-6 lg:px-6">
        <div className="flex items-center justify-between h-10 text-xs sm:text-sm font-medium">
          {/* Left - Contact Info */}
          <div className="flex items-center gap-2 sm:gap-4 md:gap-8">
            <a
              href="tel:+8801745762857"
              className="flex items-center gap-2 hover:text-amber-300 transition-colors"
            >
              <FaPhone className="" />
              01745-762857
            </a>

            <a
              href="mailto:lunorr@info.com"
              className="flex items-center gap-2 hover:text-amber-300 transition-colors xs:flex"
            >
              <FaEnvelope className="" />
              lunorr@info.com
            </a>
          </div>

          {/* Right - Links */}
          <div className="flex items-center gap-1 sm:gap-2">
            <Link
              to="/about"
              className="px-3 py-1.5 rounded-md hover:bg-gray-800 hover:text-amber-300 transition-colors"
            >
              About
            </Link>
            <Link
              to="/contact"
              className="px-3 py-1.5 rounded-md hover:bg-gray-800 hover:text-amber-300 transition-colors"
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
