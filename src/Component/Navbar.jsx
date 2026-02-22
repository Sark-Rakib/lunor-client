import React, { useState } from "react";
import { Link, NavLink } from "react-router";
import "./Navbar.css";
import userAuth from "../Hooks/useAuth";
import { FaChevronDown } from "react-icons/fa";
import { CiLogin, CiUser } from "react-icons/ci";
import navLogo from "../assets/2f6a0e78-37e2-480b-9ab0-f6bd16373f85.jpg-removebg-preview.png";

const Navbar = ({ theme, setTheme }) => {
  const { user } = userAuth();
  const [open, setOpen] = useState(false);
  const [categoryOpen, setCategoryOpen] = useState(false);

  const handleThemeToggle = (e) => {
    setTheme(e.target.checked ? "dark" : "light");
  };

  const menuItems = (
    <>
      <NavLink to="/" className="block py-2 px-4 hover:bg-gray-600 rounded">
        Home
      </NavLink>
      <NavLink
        to="/all-products"
        className="block py-2 px-4 hover:bg-gray-600 rounded"
      >
        All Products
      </NavLink>

      <li className="list-none">
        {/* Category button */}
        <button
          onClick={() => setCategoryOpen(!categoryOpen)}
          className="flex items-center gap-2 w-full py-2 px-4 font-medium hover:bg-gray-600 rounded"
        >
          Category
          <FaChevronDown
            className={`transition ml-auto ${categoryOpen ? "rotate-180" : ""}`}
          />
        </button>

        {/* Inline routes (hidden by default) */}
        {categoryOpen && (
          <ul className="ml-4 mt-2 space-y-1">
            {/* <NavLink
              to="/shirt"
              className="block py-2 px-4 hover:bg-amber-300 rounded"
            >
              Shirt
            </NavLink> */}
            <NavLink
              to="/formal-shirt"
              className="block py-2 px-4 hover:bg-gray-600 rounded"
            >
              Formal Shirt
            </NavLink>

            <NavLink
              to="/casual-shirt"
              className="block py-2 px-4 hover:bg-gray-600 rounded"
            >
              Casual Shirt
            </NavLink>

            <NavLink
              to="/pant"
              className="block py-2 px-4 hover:bg-gray-600 rounded"
            >
              Pant
            </NavLink>
            <NavLink
              to="/panjabi"
              className="block py-2 px-4 hover:bg-gray-600 rounded"
            >
              Panjabi
            </NavLink>
          </ul>
        )}
      </li>

      {/* {user && (
        <>
          <Link
            to="/add-tuition"
            className="block py-2 px-4 btn btn-primary btn-sm mt-2"
          >
            Add Tuition
          </Link>
          <Link
            to="/add-tutors"
            className="block py-2 px-4 btn btn-primary btn-sm mt-2"
          >
            Add Tutors
          </Link>
        </>
      )} */}
    </>
  );

  return (
    <div className="navbar sticky top-0 px-5 sm:px-12 lg:px-20 z-50 bg-gray-400 text-white shadow-md h-10">
      <div className="navbar-start flex items-center gap-8 sm:gap-50">
        {/* Mobile Hamburger */}
        <div className="lg:hidden">
          <button
            onClick={() => setOpen(true)}
            className="btn btn-ghost border-none hover:bg-gray-600"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        {/* Mobile Slide Menu */}
        <div
          className={`fixed inset-0 z-50 transition-all duration-300 ${
            open ? "visible" : "invisible"
          }`}
        >
          {/* Overlay */}
          <div
            onClick={() => setOpen(false)}
            className={`absolute inset-0 bg-black/40 transition-opacity duration-300 ${
              open ? "opacity-100" : "opacity-0"
            }`}
          ></div>

          {/* Drawer */}
          <div
            className={`absolute left-0 top-0 h-full w-60 text-white bg-gray-500 shadow-xl transform transition-transform duration-300 ${
              open ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b">
              <h2 className="text-xl font-bold">Menu</h2>
              <button
                onClick={() => setOpen(false)}
                className="btn btn-sm btn-ghost hover:bg-gray-600 border-none"
              >
                ✕
              </button>
            </div>

            {/* Menu Items */}
            <ul
              // onClick={() => setOpen(false)}
              className="menu p-5 text-base font-medium space-y-1"
            >
              {menuItems}
            </ul>
          </div>
        </div>

        {/* <img className="h-12 ml-3" alt="E-Tuition BD Logo" src={Logo} /> */}

        <img src={navLogo} alt="" className="w-50 h-20 mb-5" />
      </div>

      {/* Desktop Menu  */}
      <div className="navbar-center hidden md:flex">
        <ul className="menu menu-horizontal px-1 gap-8">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/all-products">All Products</NavLink>
          {/* <NavLink to="/shirt">Shirt</NavLink> */}
          <NavLink to="/formal-shirt">Formal Shirt</NavLink>
          <NavLink to="/casual-shirt">Casual Shirt</NavLink>
          <NavLink to="/pant">Pant</NavLink>
          <NavLink to="/panjabi">Panjabi</NavLink>
        </ul>
      </div>

      <div className="navbar-end">
        <div className="flex items-center gap-3 mr-2">
          <label className="swap swap-rotate">
            <input
              type="checkbox"
              onChange={handleThemeToggle}
              checked={theme === "dark"}
            />

            {/* sun icon */}
            <svg
              className="swap-on fill-current w-6 h-6 text-yellow-200"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M5.64 17l-.71.71a.996.996 0 101.41 1.41l.71-.71A.996.996 0 105.64 17zM12 4a1 1 0 100 2 1 1 0 000-2zm7.05 1.64a.996.996 0 00-1.41 0l-.71.71a.996.996 0 101.41 1.41l.71-.71a.996.996 0 000-1.41zM4 12a1 1 0 100 2 1 1 0 000-2zm8 8a1 1 0 100-2 1 1 0 000 2zm6.36-2.64a.996.996 0 10-1.41-1.41l-.71.71a.996.996 0 101.41 1.41l.71-.71zM20 12a1 1 0 100 2 1 1 0 000-2zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
            </svg>

            {/* moon icon */}
            <svg
              className="swap-off fill-current w-6 h-6 text-grya-200"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M21.64 13.65A9 9 0 1112 3a7 7 0 009.64 10.65z" />
            </svg>
          </label>
        </div>
        <div className="hidden lg:flex gap-2">
          {/* {user && (
            <Link className="btn btn-primary" to="/add-tuition">
              Add Tuition
            </Link>
          )} */}
          {/* {user && (
            <Link className="btn btn-primary" to="/add-tutors">
              Add Tutors
            </Link>
          )} */}
        </div>

        {/* Dashboard / Login */}
        {user ? (
          <Link
            className="text-xl text-white shadow-none ml-2 hover:bg-gray-600 rounded p-1"
            to="/dashboard"
          >
            <CiUser />
          </Link>
        ) : (
          <Link
            to="/login"
            className="text-xl  text-white shadow-none ml-2 mb-1 hover:bg-gray-600 rounded p-1"
          >
            <CiLogin />
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
