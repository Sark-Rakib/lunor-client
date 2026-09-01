import { Link } from "react-router";
import {
  FaFacebook,
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa";

import { SiX } from "react-icons/si"; // This is the official NEW X icon (not old Twitter)

// import logo from "../assets/2f6a0e78-37e2-480b-9ab0-f6bd16373f85.jpg-removebg-preview.png";

import Logo from "./Logo";

import FooterLogo from "./FooterLogo";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-black text-white py-5">
      {/* LUNOR Background Text */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
        aria-hidden="true"
      >
        <span
          className="
      whitespace-nowrap
      font-black
      leading-none
      tracking-[-0.08em]
      text-white/[0.035]

      text-[120px]
      sm:text-[180px]
      md:text-[260px]
      lg:text-[400px]
    "
        >
          LUNOR
        </span>
      </div>

      {/* Existing Footer Content */}
      <div className="relative z-10 px-4 sm:px-6 lg:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Platform */}
          <div>
            <span className="flex justify-start -ml-26 sm:-ml-64 md:ml-0">
              <FooterLogo></FooterLogo>
            </span>

            <p className="mt-4 text-gray-100 text-sm leading-relaxed">
              To provide high-quality, affordable fashion that blends modern
              trends with cultural elegance.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="flex flex-col space-y-3">
              <Link to="/">
                <span className="text-gray-100 hover:text-gray-600 transition-colors duration-300 text-sm">
                  Home
                </span>
              </Link>

              <Link to="/about">
                <span className="text-gray-100 hover:text-gray-600 transition-colors duration-300 text-sm">
                  About Us
                </span>
              </Link>

              <Link to="/Contact">
                <span className="text-gray-100 hover:text-gray-600 transition-colors duration-300 text-sm">
                  Contact
                </span>
              </Link>

              <Link to="/blog">
                <span className="text-gray-100 hover:text-gray-600 transition-colors duration-300 text-sm">
                  Blog
                </span>
              </Link>

              <Link to="/privacy-policy">
                <span className="text-gray-100 hover:text-gray-600 transition-colors duration-300 text-sm">
                  Privacy Policy
                </span>
              </Link>

              <Link to="/terms-service">
                <span className="text-gray-100 hover:text-gray-600 transition-colors duration-300 text-sm">
                  Terms of Service
                </span>
              </Link>
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
            <ul className="space-y-3 text-sm text-gray-100">
              <li>
                <span className="font-medium">
                  Email : wear.lunor@gmail.com
                </span>
              </li>

              <li>
                <span className="font-medium">Phone : +880 1745762857</span>
              </li>

              <li>
                <span className="font-medium">
                  Address : Dhunat more , Sherpur, Bogura, Bangladesh, 5840
                </span>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Follow Us</h4>

            <div className="flex gap-4">
              <a
                href="https://www.facebook.com/profile.php?id=61560576206601"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 backdrop-blur-sm p-3 rounded-full hover:bg-indigo-600 transition-all duration-300 hover:scale-110"
              >
                <FaFacebook size={20} />
              </a>

              <a
                href="https://www.instagram.com/wear.lunor/?hl=en"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 backdrop-blur-sm p-3 rounded-full hover:bg-indigo-600 transition-all duration-300 hover:scale-110"
              >
                <FaInstagram size={20} />
              </a>

              <a
                href="https://x.com/Cap_tain01"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 backdrop-blur-sm p-3 rounded-full hover:bg-black transition-all duration-300 hover:scale-110"
              >
                <SiX size={20} />
              </a>

              <a
                href="https://www.linkedin.com/in/rakib-sarker-"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 backdrop-blur-sm p-3 rounded-full hover:bg-indigo-600 transition-all duration-300 hover:scale-110"
              >
                <FaLinkedinIn size={20} />
              </a>

              <a
                href="https://www.youtube.com/@rakibrecord"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 backdrop-blur-sm p-3 rounded-full hover:bg-red-600 transition-all duration-300 hover:scale-110"
              >
                <FaYoutube size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="flex flex-col sm:flex-row lg:flex-row justify-between items-center border-t border-white/20 mt-10 pt-8 text-center">
          <p className="text-sm text-gray-100">
            © {currentYear} LUNOR. All rights reserved.
          </p>

          <p className="flex items-center gap-2 text-sm text-gray-100">
            Design & Developed by{" "}
            <a
              href="https://www.facebook.com/sarkrakib/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-indigo-600 border-b border-white transition-all duration-300 hover:scale-110"
            >
              Rakib Sarker
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
