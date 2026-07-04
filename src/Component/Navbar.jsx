import React, { useEffect, useState } from "react";
import { NavLink, Link } from "react-router"; // ← fixed import (react-router → react-router-dom)
import "./Navbar.css";
import useAuth from "../Hooks/useAuth"; // assuming this is the correct path
import { FaChevronDown, FaBars, FaTimes } from "react-icons/fa";
import { CiLogin, CiUser } from "react-icons/ci";
// import navLogo from "../assets/2f6a0e78-37e2-480b-9ab0-f6bd16373f85.jpg-removebg-preview.png";
import Logo from "./Logo";

const Navbar = ({ theme, setTheme }) => {
  const { user } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [openFormal, setOpenFormal] = useState(false);
  const [openCasual, setOpenCasual] = useState(false);
  const [openTshirt, setOpenTshirt] = useState(false);
  const [openPant, setOpenPant] = useState(false);
  const [catOpen, setCatOpen] = useState(false);
  const timeoutRef = React.useRef(null);

  const handleEnter = () => {
    clearTimeout(timeoutRef.current);
    setCatOpen(true);
  };

  const handleLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setCatOpen(false);
    }, 150);
  };

  const handleThemeToggle = (e) => {
    setTheme(e.target.checked ? "dark" : "light");
  };

  const closeMobileMenu = () => {
    setMobileOpen(false);
    setCategoryOpen(false); // optional: close submenu too
  };

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const menuItems = (
    <>
      {/* HOME */}
      <NavLink
        to="/"
        className="block py-2 px-4 text-xs"
        onClick={closeMobileMenu}
      >
        HOME
      </NavLink>

      {/* ALL PRODUCTS */}
      <NavLink
        to="/all-products"
        className="block py-2 px-4 text-xs"
        onClick={closeMobileMenu}
      >
        ALL PRODUCTS
      </NavLink>

      {/* CATEGORY */}
      <div className="border-t mt-2 pt-2">
        <button
          onClick={() => setCategoryOpen(!categoryOpen)}
          className="flex items-center justify-between w-full px-4 py-2 text-xs font-semibold"
        >
          CATEGORY
          <FaChevronDown
            className={`transition-transform ${
              categoryOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {categoryOpen && (
          <div className="pl-4 border-l ml-4 space-y-3">
            {/* BASIC WEAR */}
            <div>
              <div className="text-[10px] opacity-60 mb-1">
                BASIC WEAR
                <hr />
              </div>

              <li className="list-none">
                {/* Parent Menu */}
                <button
                  onClick={() => {
                    setOpenFormal(!openFormal);
                    setOpenCasual(false);
                    setOpenTshirt(false);
                    setOpenPant(false);
                  }}
                  className="flex items-center justify-between w-full text-xs py-1"
                >
                  <span>FORMAL SHIRT</span>

                  <span>{openFormal ? "-" : "+"}</span>
                </button>

                {/* Dropdown */}
                {openFormal && (
                  <div className="pl-4 mt-1 space-y-1">
                    <NavLink
                      to="/formal-shirt"
                      onClick={closeMobileMenu}
                      className="block text-[9px] py-1"
                    >
                      FULL SLEEVE
                    </NavLink>

                    <NavLink
                      to="half-sleeve"
                      onClick={closeMobileMenu}
                      className="block text-[9px] py-1"
                    >
                      HALF SLEEVE
                    </NavLink>
                  </div>
                )}
              </li>

              <li className="list-none">
                {/* Parent Menu */}
                <button
                  onClick={() => {
                    setOpenCasual(!openCasual);
                    setOpenFormal(false);
                    setOpenTshirt(false);
                    setOpenPant(false);
                  }}
                  className="flex items-center justify-between w-full text-xs py-1"
                >
                  <span>CASUAL SHIRT</span>

                  <span>{openCasual ? "-" : "+"}</span>
                </button>

                {/* Dropdown */}
                {openCasual && (
                  <div className="pl-4 mt-1 space-y-1">
                    <NavLink
                      to="/casual-shirt"
                      onClick={closeMobileMenu}
                      className="block text-[9px] py-1"
                    >
                      FULL SLEEVE
                    </NavLink>

                    <NavLink
                      to="/half-sleeve"
                      onClick={closeMobileMenu}
                      className="block text-[9px] py-1"
                    >
                      HALF SLEEVE
                    </NavLink>
                  </div>
                )}
              </li>
              <li className="list-none">
                {/* Parent Menu */}
                <button
                  onClick={() => {
                    setOpenTshirt(!openTshirt);
                    setOpenFormal(false);
                    setOpenCasual(false);
                    setOpenPant(false);
                  }}
                  className="flex items-center justify-between w-full text-xs py-1"
                >
                  <span>T-SHIRT</span>

                  <span>{openTshirt ? "-" : "+"}</span>
                </button>

                {/* Dropdown */}
                {openTshirt && (
                  <div className="pl-4 mt-1 space-y-1">
                    <NavLink
                      to="/t-shirt"
                      onClick={closeMobileMenu}
                      className="block text-[9px] py-1"
                    >
                      T-SHIRT
                    </NavLink>

                    <NavLink
                      to="/polo-shirt"
                      onClick={closeMobileMenu}
                      className="block text-[9px] py-1"
                    >
                      POLO SHIRT
                    </NavLink>
                  </div>
                )}
              </li>
              <li className="list-none">
                {/* Parent Menu */}
                <button
                  onClick={() => {
                    setOpenPant(!openPant);
                    setOpenFormal(false);
                    setOpenCasual(false);
                    setOpenTshirt(false);
                  }}
                  className="flex items-center justify-between w-full text-xs py-1"
                >
                  <span>BOTTOM</span>

                  <span>{openPant ? "-" : "+"}</span>
                </button>

                {/* Dropdown */}
                {openPant && (
                  <div className="pl-4 mt-1 space-y-1">
                    <NavLink
                      to="/trousers"
                      onClick={closeMobileMenu}
                      className="block text-[9px] py-1"
                    >
                      TROUSERS
                    </NavLink>

                    <NavLink
                      to="/baggy"
                      onClick={closeMobileMenu}
                      className="block text-[9px] py-1"
                    >
                      BAGGY PANTS
                    </NavLink>

                    <NavLink
                      to="/jeans"
                      onClick={closeMobileMenu}
                      className="block text-[9px] py-1"
                    >
                      JEANS PANTS
                    </NavLink>

                    <NavLink
                      to="/chino"
                      onClick={closeMobileMenu}
                      className="block text-[9px] py-1"
                    >
                      CHINO PANTS
                    </NavLink>
                  </div>
                )}
              </li>
              <NavLink
                to="/panjabi"
                onClick={closeMobileMenu}
                className="block text-xs py-1"
              >
                PANJABI
              </NavLink>
            </div>

            {/* CASUAL WEAR */}
            <div>
              <div className="text-[10px] opacity-60 mb-1">
                CASUAL WEAR
                <hr />
              </div>

              {/* <NavLink
                to="/jeans"
                onClick={closeMobileMenu}
                className="block text-xs py-1"
              >
                JEANS
              </NavLink> */}
              <NavLink
                to="/hoodie"
                onClick={closeMobileMenu}
                className="block text-xs py-1"
              >
                HOODIE
              </NavLink>
              <NavLink
                to="/jacket"
                onClick={closeMobileMenu}
                className="block text-xs py-1"
              >
                JACKET
              </NavLink>
              <NavLink
                to="/sweater"
                onClick={closeMobileMenu}
                className="block text-xs py-1"
              >
                SWEATER
              </NavLink>
              <NavLink
                to="/shorts"
                onClick={closeMobileMenu}
                className="block text-xs py-1"
              >
                SHORTS
              </NavLink>
            </div>

            {/* ACCESSORIES */}
            <div>
              <div className="text-[10px] opacity-60 mb-1">
                ACCESSORIES
                <hr />
              </div>

              <NavLink
                to="/shoes"
                onClick={closeMobileMenu}
                className="block text-xs py-1"
              >
                SHOES
              </NavLink>
              <NavLink
                to="/belt"
                onClick={closeMobileMenu}
                className="block text-xs py-1"
              >
                BELT
              </NavLink>
              <NavLink
                to="/watch"
                onClick={closeMobileMenu}
                className="block text-xs py-1"
              >
                WATCH
              </NavLink>
              <NavLink
                to="/cap"
                onClick={closeMobileMenu}
                className="block text-xs py-1"
              >
                CAP
              </NavLink>
              <NavLink
                to="/sunglasses"
                onClick={closeMobileMenu}
                className="block text-xs py-1"
              >
                SUNGLASSES
              </NavLink>
            </div>
          </div>
        )}
      </div>
    </>
  );

  return (
    <>
      {/* Main Navbar */}
      <nav
        className={` sticky top-0 z-50 transition-all duration-300 backdrop-blur-md
  ${theme === "dark" ? "bg-black text-white" : "bg-white text-black"}`}
      >
        <div className="px-3 sm:px-8 md:px-6 lg:px-6 shadow">
          <div className="flex items-center justify-between h-17">
            {/* Left - Logo + Mobile Hamburger */}
            <div className="flex items-center gap-4">
              {/* Mobile Hamburger */}
              <button
                className="lg:hidden text-xl focus:outline-none"
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label="Toggle menu"
              >
                {mobileOpen ? <FaTimes /> : <FaBars />}
              </button>

              {/* Logo */}
              {/* <Link to="/" className="flex items-center">
                <img
                  src={navLogo}
                  alt="Logo"
                  className="h-22 w-full object-contain mb-6 ml-13 sm:-ml-5 md:-ml-8 lg:-ml-8"
                />
              </Link> */}
              <Logo></Logo>
            </div>

            {/* Center - Desktop Menu */}
            <div className="hidden lg:flex items-center gap-8">
              <ul className="flex items-center gap-6 text-xs font-medium">
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    isActive ? "underline" : "hover:opacity-80"
                  }
                >
                  HOME
                </NavLink>
                <NavLink
                  to="/all-products"
                  className={({ isActive }) =>
                    isActive ? "underline" : "hover:opacity-80"
                  }
                >
                  ALL PRODUCTS
                </NavLink>
                {/* Desktop Category Dropdown */}

                <div
                  className="relative"
                  onMouseEnter={handleEnter}
                  onMouseLeave={handleLeave}
                >
                  {/* BUTTON */}
                  <button className="flex items-center gap-1 hover:opacity-80">
                    CATEGORY
                    <FaChevronDown className="text-xs" />
                  </button>

                  {/* DROPDOWN */}
                  {catOpen && (
                    <div className="fixed left-0 top-16 w-full z-50">
                      {/* IMPORTANT: this is the hover bridge */}
                      <div className="w-full" />

                      <div
                        className={`border-t shadow-xl ${
                          theme === "dark"
                            ? "bg-gray-900 text-white border-gray-700"
                            : "bg-white text-black border-gray-200"
                        }`}
                      >
                        <div className="max-w-6xl mx-auto px-6 py-8">
                          <div className="grid grid-cols-3 gap-12">
                            {/* COLUMN 1 */}
                            <div className="space-y-2">
                              <div className="text-xs opacity-60 mb-2">
                                BASIC WEAR
                                <hr />
                              </div>

                              <NavLink
                                to="/formal-shirt"
                                className="block text-xs"
                              >
                                FORMAL SHIRT
                              </NavLink>

                              <NavLink
                                to="/casual-shirt"
                                className="block text-sx"
                              >
                                CASUAL SHIRT
                              </NavLink>
                              <NavLink
                                to="/half-sleeve"
                                className="block text-sx"
                              >
                                HALF SLEEVE
                              </NavLink>
                              <NavLink to="/t-shirt" className="block text-xs">
                                T-SHIRT
                              </NavLink>
                              <NavLink
                                to="/polo-shirt"
                                className="block text-xs"
                              >
                                POLO-SHIRT
                              </NavLink>
                              <NavLink to="/panjabi" className="block text-xs">
                                PANJABI
                              </NavLink>
                            </div>

                            {/* COLUMN 2 */}
                            <div className="space-y-2">
                              <div className="text-xs opacity-60 mb-2">
                                CASUAL WEAR
                                <hr />
                              </div>
                              <NavLink to="/jeans" className="block text-xs">
                                JEANS PANTS
                              </NavLink>
                              <NavLink to="/trousers" className="block text-xs">
                                TROUSERS
                              </NavLink>
                              <NavLink to="/baggy" className="block text-xs">
                                BAGGY PANTS
                              </NavLink>
                              <NavLink to="/chino" className="block text-xs">
                                CHINO PANTS
                              </NavLink>
                              <NavLink to="/hoodie" className="block text-xs">
                                HOODIE
                              </NavLink>
                              <NavLink to="/jacket" className="block text-xs">
                                JACKET
                              </NavLink>
                              <NavLink to="/sweater" className="block text-xs">
                                SWEATER
                              </NavLink>
                              <NavLink to="/shorts" className="block text-xs">
                                SHORTS
                              </NavLink>
                            </div>

                            {/* COLUMN 3 */}
                            <div className="space-y-2">
                              <div className="text-xs opacity-60 mb-2">
                                ACCESSORIES
                                <hr />
                              </div>
                              <NavLink to="/shoes" className="block text-xs">
                                SHOES
                              </NavLink>
                              <NavLink to="/belt" className="block text-xs">
                                BELT
                              </NavLink>
                              <NavLink to="/watch" className="block text-xs">
                                WATCH
                              </NavLink>
                              <NavLink to="/cap" className="block text-xs">
                                CAP
                              </NavLink>
                              <NavLink
                                to="/sunglasses"
                                className="block text-xs"
                              >
                                SUNGLASSES
                              </NavLink>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
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
                  className="swap-on fill-current w-6 h-6 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path d="M5.64 17l-.71.71a1 1 0 001.41 1.41l.71-.71a1 1 0 10-1.41-1.41zM12 4a1 1 0 100 2 1 1 0 000-2zm7.05 1.64a1 1 0 00-1.41 0l-.71.71a1 1 0 101.41 1.41l.71-.71a1 1 0 000-1.41zM4 12a1 1 0 100 2 1 1 0 000-2zm8 8a1 1 0 100-2 1 1 0 000 2zm6.36-2.64a1 1 0 10-1.41-1.41l-.71.71a1 1 0 101.41 1.41l.71-.71zM20 12a1 1 0 100 2 1 1 0 000-2zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
                </svg>

                {/* Moon icon - visible in LIGHT mode (swap-off = unchecked) */}
                <svg
                  className="swap-off fill-current w-6 h-6 text-black"
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
      {/* Mobile Sidebar Drawer */}
      <div
        className={`fixed inset-0 z-100 lg:hidden transition-all duration-300 ${
          mobileOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        {/* Overlay */}
        <div
          className={`absolute inset-0 transition-opacity duration-300 ${
            mobileOpen ? "opacity-100" : "opacity-0"
          } bg-black/50`}
          onClick={closeMobileMenu}
        />

        {/* Drawer Panel */}
        <div
          className={`absolute top-0 left-0 h-full w-72 shadow-2xl overflow-y-auto  transform transition-transform duration-300 ease-in-out ${
            mobileOpen ? "translate-x-0" : "-translate-x-full"
          } ${
            theme === "dark" ? "bg-black text-white" : "bg-white text-black"
          }`}
        >
          <div className="flex items-center justify-between p-5 border-b border-gray-200">
            <h2 className="text-xl font-bold">Menu</h2>
            <button
              onClick={closeMobileMenu}
              className="text-lg focus:outline-none hover:text-gray-600"
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
