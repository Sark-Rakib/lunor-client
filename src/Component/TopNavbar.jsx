import React from "react";
import { FaMailBulk, FaPhone } from "react-icons/fa";
import { Link } from "react-router";

const TopNavbar = () => {
  return (
    <div>
      <nav className="bg-gray-800 text-white p-3 text-xs px-2 sm:px-7 lg:px-5">
        <div className="container mx-auto flex items-center justify-between sm:mx-auto ml-1">
          <div className="flex items-center gap-2 md:gap-5">
            <p className="flex items-center gap-2">
              <FaPhone></FaPhone> 01745762857
            </p>
            <p className="flex items-center gap-2">
              <FaMailBulk></FaMailBulk> lunorr@info.com
            </p>
          </div>
          <div>
            <Link to="/about" className="px-3 py-2 hover:bg-gray-700 rounded">
              About
            </Link>
            <Link to="/contact" className="px-3 py-2 hover:bg-gray-700 rounded">
              Contact
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default TopNavbar;
