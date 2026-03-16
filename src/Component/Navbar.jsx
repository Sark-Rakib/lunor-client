import React, { useState } from "react";
import { NavLink, Link } from "react-router"; // ← fixed import (react-router → react-router-dom)
import "./Navbar.css";
import useAuth from "../Hooks/useAuth"; // assuming this is the correct path
import { FaChevronDown, FaBars, FaTimes } from "react-icons/fa";
import { CiLogin, CiUser } from "react-icons/ci";
import navLogo from "../assets/2f6a0e78-37e2-480b-9ab0-f6bd16373f85.jpg-removebg-preview.png";

const Navbar = ({ theme, setTheme }) => {
  const { user } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [categoryOpen, setCategoryOpen] = useState(false);

  const handleThemeToggle = (e) => {
    setTheme(e.target.checked ? "dark" : "light");
  };

  const closeMobileMenu = () => {
    setMobileOpen(false);
    setCategoryOpen(false); // optional: close submenu too
  };

  const menuItems = (
    <>
      <NavLink
        to="/"
        className={({ isActive }) =>
          `block py-2.5 px-4 rounded ${isActive ? "bg-gray-700" : "hover:bg-gray-600"}`
        }
        onClick={closeMobileMenu}
      >
        Home
      </NavLink>

      <NavLink
        to="/all-products"
        className={({ isActive }) =>
          `block py-2.5 px-4 rounded ${isActive ? "bg-gray-700" : "hover:bg-gray-600"}`
        }
        onClick={closeMobileMenu}
      >
        All Products
      </NavLink>

      {/* Category Dropdown */}
      <div className="relative">
        <button
          onClick={() => setCategoryOpen(!categoryOpen)}
          className="flex items-center justify-between w-full py-2.5 px-4 font-medium hover:bg-gray-600 rounded"
        >
          Category
          <FaChevronDown
            className={`transition-transform duration-200 ${categoryOpen ? "rotate-180" : ""}`}
          />
        </button>

        {categoryOpen && (
          <ul className="ml-5 mt-1 space-y-1 border-l-2 border-gray-600 pl-3">
            <NavLink
              to="/formal-shirt"
              className={({ isActive }) =>
                `block py-2 px-4 rounded ${isActive ? "bg-gray-700" : "hover:bg-gray-600"}`
              }
              onClick={closeMobileMenu}
            >
              Formal Shirt
            </NavLink>
            <NavLink
              to="/casual-shirt"
              className={({ isActive }) =>
                `block py-2 px-4 rounded ${isActive ? "bg-gray-700" : "hover:bg-gray-600"}`
              }
              onClick={closeMobileMenu}
            >
              Casual Shirt
            </NavLink>
            <NavLink
              to="/pant"
              className={({ isActive }) =>
                `block py-2 px-4 rounded ${isActive ? "bg-gray-700" : "hover:bg-gray-600"}`
              }
              onClick={closeMobileMenu}
            >
              Pant
            </NavLink>
            <NavLink
              to="/panjabi"
              className={({ isActive }) =>
                `block py-2 px-4 rounded ${isActive ? "bg-gray-700" : "hover:bg-gray-600"}`
              }
              onClick={closeMobileMenu}
            >
              Panjabi
            </NavLink>
          </ul>
        )}
      </div>
    </>
  );

  return (
    <>
      {/* Main Navbar */}
      <nav className="sticky top-0 z-50 bg-gray-400 text-white shadow-lg">
        <div className="px-3 sm:px-8 md:px-6 lg:px-6">
          <div className="flex items-center justify-between h-16">
            {/* Left - Logo + Mobile Hamburger */}
            <div className="flex items-center gap-4">
              {/* Mobile Hamburger */}
              <button
                className="lg:hidden text-2xl focus:outline-none"
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label="Toggle menu"
              >
                {mobileOpen ? <FaTimes /> : <FaBars />}
              </button>

              {/* Logo */}
              <Link to="/" className="flex items-center">
                <img
                  src={navLogo}
                  alt="Logo"
                  className="h-22 w-full object-contain mb-6 ml-13 sm:-ml-8 md:-ml-8 lg:-ml-8"
                />
              </Link>
            </div>

            {/* Center - Desktop Menu */}
            <div className="hidden lg:flex items-center gap-8">
              <ul className="flex items-center gap-6 text-sm font-medium">
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    isActive ? "text-gray-900" : "hover:text-gray-900"
                  }
                >
                  Home
                </NavLink>
                <NavLink
                  to="/all-products"
                  className={({ isActive }) =>
                    isActive ? "text-gray-900" : "hover:text-gray-900"
                  }
                >
                  All Products
                </NavLink>

                {/* Desktop Category Dropdown */}
                <div className="relative group">
                  <button className="flex items-center gap-1 hover:text-gray-900">
                    Category
                    <FaChevronDown className="text-xs" />
                  </button>
                  <div className="absolute left-0 top-full pt-2 hidden group-hover:block w-48">
                    <div className="bg-gray-800 shadow-xl rounded-md py-2 border border-gray-700">
                      <NavLink
                        to="/formal-shirt"
                        className={({ isActive }) =>
                          `block px-4 py-2 text-sm hover:bg-gray-700 ${isActive ? "bg-gray-700" : ""}`
                        }
                      >
                        Formal Shirt
                      </NavLink>
                      <NavLink
                        to="/casual-shirt"
                        className={({ isActive }) =>
                          `block px-4 py-2 text-sm hover:bg-gray-700 ${isActive ? "bg-gray-700" : ""}`
                        }
                      >
                        Casual Shirt
                      </NavLink>
                      <NavLink
                        to="/pant"
                        className={({ isActive }) =>
                          `block px-4 py-2 text-sm hover:bg-gray-700 ${isActive ? "bg-gray-700" : ""}`
                        }
                      >
                        Pant
                      </NavLink>
                      <NavLink
                        to="/panjabi"
                        className={({ isActive }) =>
                          `block px-4 py-2 text-sm hover:bg-gray-700 ${isActive ? "bg-gray-700" : ""}`
                        }
                      >
                        Panjabi
                      </NavLink>
                    </div>
                  </div>
                </div>
              </ul>
            </div>

            {/* Right - Theme + Auth */}
            <div className="flex items-center gap-4">
              {/* Theme Toggle */}
              <label className="swap swap-rotate">
                <input
                  type="checkbox"
                  onChange={handleThemeToggle}
                  checked={theme === "dark"}
                />

                {/* Sun icon - visible in DARK mode (swap-on = checked) */}
                <svg
                  className="swap-on fill-current w-6 h-6 text-yellow-300"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path d="M5.64 17l-.71.71a1 1 0 001.41 1.41l.71-.71a1 1 0 10-1.41-1.41zM12 4a1 1 0 100 2 1 1 0 000-2zm7.05 1.64a1 1 0 00-1.41 0l-.71.71a1 1 0 101.41 1.41l.71-.71a1 1 0 000-1.41zM4 12a1 1 0 100 2 1 1 0 000-2zm8 8a1 1 0 100-2 1 1 0 000 2zm6.36-2.64a1 1 0 10-1.41-1.41l-.71.71a1 1 0 101.41 1.41l.71-.71zM20 12a1 1 0 100 2 1 1 0 000-2zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
                </svg>

                {/* Moon icon - visible in LIGHT mode (swap-off = unchecked) */}
                <svg
                  className="swap-off fill-current w-6 h-6 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path d="M21.64 13.65A9 9 0 1112 3a7 7 0 009.64 10.65z" />
                </svg>
              </label>

              {/* Auth Icon */}
              {user ? (
                <Link
                  to="/dashboard"
                  className="text-2xl hover:bg-gray-700 rounded-full transition"
                  title="Dashboard"
                >
                  <CiUser />
                </Link>
              ) : (
                <Link
                  to="/login"
                  className="text-2xl hover:bg-gray-700 rounded-full transition"
                  title="Login"
                >
                  <CiLogin />
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Sidebar Drawer */}
      <div
        className={`fixed inset-0 z-50 lg:hidden transition-all duration-300 ${
          mobileOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        {/* Overlay */}
        <div
          className={`absolute inset-0 bg-black/50 transition-opacity duration-300 ${
            mobileOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={closeMobileMenu}
        />

        {/* Drawer Panel */}
        <div
          className={`absolute top-0 left-0 h-full w-72 bg-gray-400 shadow-2xl transform transition-transform duration-300 ease-in-out ${
            mobileOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between p-5 border-b border-gray-800">
            <h2 className="text-xl font-bold">Menu</h2>
            <button
              onClick={closeMobileMenu}
              className="text-2xl focus:outline-none hover:text-gray-400"
            >
              <FaTimes />
            </button>
          </div>

          <div className="p-5">
            <div className="flex flex-col space-y-1 text-base font-medium">
              {menuItems}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
