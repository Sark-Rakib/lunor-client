import React from "react";
import { Link, NavLink, Outlet, useNavigate } from "react-router";
import { CiLogout } from "react-icons/ci";
import { FaComment, FaPlusSquare, FaShoppingBag } from "react-icons/fa";
import { MdAdminPanelSettings } from "react-icons/md";
import { FaHome } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import useAuth from "../Hooks/useAuth";
import UseRole from "../Hooks/useRole";

const DashboardLayout = () => {
  const { role } = UseRole();
  const { user, logOut } = useAuth();
  const navigate = useNavigate();

  const handleLogOut = () => {
    logOut()
      .then(() => {
        navigate("/");
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  return (
    <div className="drawer lg:drawer-open">
      <title>Lunor | Dashboard</title>
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* Navbar */}
        <nav className="navbar sticky top-0 z-10 w-full bg-black text-white">
          <label
            htmlFor="my-drawer-4"
            aria-label="open sidebar"
            className="btn btn-square btn-ghost hover:bg-gray-600 border-none"
          >
            {/* Sidebar toggle icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2"
              fill="none"
              stroke="currentColor"
              className="my-1.5 inline-block size-4"
            >
              <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path>
              <path d="M9 4v16"></path>
              <path d="M14 10l2 2l-2 2"></path>
            </svg>
          </label>
          <div className="px-4">LUNOR DASHBOARD</div>
        </nav>
        {/* Page content here */}
        <Outlet></Outlet>
      </div>
      <div className="drawer-side is-drawer-close:overflow-visible">
        <label
          htmlFor="my-drawer-4"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <div className="flex min-h-full flex-col items-start bg-black is-drawer-close:w-20 is-drawer-open:w-64">
          {/* Sidebar content here */}
          <ul className="menu w-full grow">
            {/* List item */}
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `group flex items-center justify-start gap-3 mb-1.5 px-4 py-3 rounded tooltip tooltip-right
      transition-all duration-300
      ${
        isActive
          ? "bg-white text-black shadow-md"
          : "text-gray-400 hover:bg-white/10 hover:text-white hover:translate-x-1"
      }`
                }
                data-tip="Homepage"
              >
                <FaHome className="text-l transition-transform duration-300 group-hover:scale-110" />

                <span className="is-drawer-close:hidden font-medium">
                  Homepage
                </span>
              </NavLink>
            </li>

            {/* our dashboard links */}

            {/* my order */}
            <li>
              <NavLink
                to="/dashboard/my-orders"
                className={({ isActive }) =>
                  `group flex items-center justify-start gap-3 mb-1.5 px-4 py-3 rounded tooltip tooltip-right
      transition-all duration-300
      ${
        isActive
          ? "bg-white text-black shadow-md"
          : "text-gray-400 hover:bg-white/10 hover:text-white hover:translate-x-1"
      }`
                }
                data-tip="My Order"
              >
                <FaShoppingCart className="text-l transition-transform duration-300 group-hover:scale-110" />

                <span className="is-drawer-close:hidden font-medium">
                  My Order
                </span>
              </NavLink>
            </li>

            {role === "admin" && (
              <>
                <div>
                  <p className="text-white underline text-[10px] text-center p-3 uppercase flex-wrap">
                    Admin
                  </p>
                </div>

                <li>
                  <NavLink
                    to="/dashboard/admin"
                    className={({ isActive }) =>
                      `group flex items-center justify-start gap-3 mb-1.5 px-4 py-3 rounded tooltip tooltip-right
      transition-all duration-300
      ${
        isActive
          ? "bg-white text-black shadow-md"
          : "text-gray-400 hover:bg-white/10 hover:text-white hover:translate-x-1"
      }`
                    }
                    data-tip="User Management"
                  >
                    <MdAdminPanelSettings className="text-l transition-transform duration-300 group-hover:scale-110" />

                    <span className="is-drawer-close:hidden font-medium">
                      User Management
                    </span>
                  </NavLink>
                </li>
                {/* customer order */}
                <li>
                  <NavLink
                    to="/dashboard/customer-orders"
                    className={({ isActive }) =>
                      `group flex items-center justify-start gap-3 mb-1.5 px-4 py-3 rounded tooltip tooltip-right
      transition-all duration-300
      ${
        isActive
          ? "bg-white text-black shadow-md"
          : "text-gray-400 hover:bg-white/10 hover:text-white hover:translate-x-1"
      }`
                    }
                    data-tip="Customer Orders"
                  >
                    <FaShoppingBag className="text-l transition-transform duration-300 group-hover:scale-110" />

                    <span className="is-drawer-close:hidden font-medium">
                      Customer Orders
                    </span>
                  </NavLink>
                </li>

                {/* customer contact */}
                <li>
                  <NavLink
                    to="/dashboard/customer-contact"
                    className={({ isActive }) =>
                      `group flex items-center justify-start gap-3 mb-1.5 px-4 py-3 rounded tooltip tooltip-right
      transition-all duration-300
      ${
        isActive
          ? "bg-white text-black shadow-md"
          : "text-gray-400 hover:bg-white/10 hover:text-white hover:translate-x-1"
      }`
                    }
                    data-tip="Customer Contact"
                  >
                    <FaComment className="text-l transition-transform duration-300 group-hover:scale-110" />

                    <span className="is-drawer-close:hidden font-medium">
                      Customer Orders
                    </span>
                  </NavLink>
                </li>
                {/* products */}

                <li>
                  <NavLink
                    to="/dashboard/student"
                    className={({ isActive }) =>
                      `group flex items-center justify-start gap-3 mb-1.5 px-4 py-3 rounded tooltip tooltip-right
      transition-all duration-300
      ${
        isActive
          ? "bg-white text-black shadow-md"
          : "text-gray-400 hover:bg-white/10 hover:text-white hover:translate-x-1"
      }`
                    }
                    data-tip="Products"
                  >
                    <FaShoppingCart className="text-l transition-transform duration-300 group-hover:scale-110" />
                    <span className="is-drawer-close:hidden">Products</span>
                  </NavLink>
                </li>

                {/* add products */}

                <li>
                  <NavLink
                    to="/dashboard/add-tuition"
                    className={({ isActive }) =>
                      `group flex items-center justify-start gap-3 mb-1.5 px-4 py-3 rounded tooltip tooltip-right
      transition-all duration-300
      ${
        isActive
          ? "bg-white text-black shadow-md"
          : "text-gray-400 hover:bg-white/10 hover:text-white hover:translate-x-1"
      }`
                    }
                    data-tip="Add Product"
                  >
                    <FaPlusSquare className="text-l transition-transform duration-300 group-hover:scale-110" />

                    <span className="is-drawer-close:hidden font-medium">
                      Add Product
                    </span>
                  </NavLink>
                </li>

                {/* add hero photo */}
                <li>
                  <Link
                    to="/dashboard/add-hero-photo"
                    className="btn bg-[#aba65e] shadow-[#aba65e] text-white flex items-center justify-start mb-1 is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="Add Hero Photo"
                  >
                    <FaPlusSquare />
                    <span className="is-drawer-close:hidden">
                      Add Hero Photo
                    </span>
                  </Link>
                </li>
              </>
            )}
            {/* add hero photo */}

            {/* payment history */}
            {/* <li>
              <Link
                to="/dashboard/payment"
                className="btn bg-amber-400 shadow-amber-200 flex items-center mb-1 is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Payment History"
              >
                <MdPayment />
                <span className="is-drawer-close:hidden">Payment History</span>
              </Link>
            </li> */}
          </ul>
          {/* user profile */}
          <div className="w-full p-2">
            <li>
              <Link
                to="/dashboard/profile"
                className="btn flex items-center justify-start mb-1 gap-2
    is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="My Profile"
              >
                {/* profile icon */}

                <img
                  src={user?.photoURL}
                  alt="User"
                  className="w-8 h-8 rounded-full object-cover"
                />
                <span className="is-drawer-close:hidden">My Profile</span>
              </Link>
            </li>

            {/* log out button */}
            <li>
              <button
                onClick={handleLogOut}
                className="btn bg-red-500 text-white flex items-center w-full is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Log Out"
              >
                {/* logout icon */}
                <CiLogout />
                <span className="is-drawer-close:hidden">Logout</span>
              </button>
            </li>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
