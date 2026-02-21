import { FaFacebookF, FaLinkedinIn, FaYoutube } from "react-icons/fa";
import { SiX } from "react-icons/si"; // This is the official NEW X icon (not old Twitter)
import { Link } from "react-router";
import logo from "../assets/2f6a0e78-37e2-480b-9ab0-f6bd16373f85.jpg-removebg-preview.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-400 text-white py-5">
      <div className="w-11/12 mx-auto sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Platform */}
          <div className="">
            {/* <h3 className="text-2xl font-bold">LUNOR</h3> */}
            <img src={logo} alt="LUNOR Logo" className="h-24 -ml-13" />
            <p className="text-gray-100 text-sm leading-relaxed">
              Taste the Authentic Home-Cooked Flavor. <br />
              Fresh, Hygienic & Delicious.
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
              <li className="flex items-center gap-2">
                <span className="font-medium">Email : lunor2026@gmail.com</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="font-medium">Phone : +880 1745762857</span>
              </li>
              <li className="flex items-center gap-2">
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
                href="https://www.facebook.com/profile.php?id=61587197698698#"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 backdrop-blur-sm p-3 rounded-full hover:bg-indigo-600 transition-all duration-300 hover:scale-110"
              >
                <FaFacebookF size={20} />
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
        <div className="border-t border-white/20 mt-10 pt-8 text-center">
          <p className="text-sm text-gray-100">
            © {currentYear} LUNOR. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
