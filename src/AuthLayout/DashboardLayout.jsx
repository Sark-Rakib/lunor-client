import React from "react";
import { Link, Outlet, useNavigate } from "react-router";
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
        <nav className="navbar text-white sticky top-0 z-10 w-full bg-gray-400">
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
          <div className="px-4">LUNOR Dashboard</div>
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
        <div className="flex min-h-full flex-col items-start bg-gray-400 is-drawer-close:w-20 is-drawer-open:w-64">
          {/* Sidebar content here */}
          <ul className="menu w-full grow">
            {/* List item */}
            <li>
              <Link
                to="/"
                className="btn bg-gray-600 shadow-gray-400 text-white flex items-center justify-start mb-1 is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Homepage"
              >
                {/* Home icon */}

                <FaHome />
                <span className="is-drawer-close:hidden">Homepage</span>
              </Link>
            </li>

            {/* our dashboard links */}

            {/* my order */}
            <li>
              <Link
                to="/dashboard/my-orders"
                className="btn bg-gray-600 shadow-gray-400 text-white flex items-center justify-start mb-1 is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="My Order"
              >
                <FaShoppingCart />
                <span className="is-drawer-close:hidden">My Order</span>
              </Link>
            </li>

            {role === "admin" && (
              <>
                <li>
                  <Link
                    to="/dashboard/admin"
                    className="btn bg-gray-600 shadow-gray-400 text-white flex items-center justify-start mb-1 is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="User Management"
                  >
                    <MdAdminPanelSettings />
                    <span className="is-drawer-close:hidden">
                      User Management
                    </span>
                  </Link>
                </li>
                {/* customer order */}
                <li>
                  <Link
                    to="/dashboard/customer-orders"
                    className="btn bg-gray-600 shadow-gray-400 text-white flex items-center justify-start mb-1 is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="Customer Orders"
                  >
                    <FaShoppingBag />
                    <span className="is-drawer-close:hidden">
                      Customer Orders
                    </span>
                  </Link>
                </li>
                {/* customer contact */}
                <li>
                  <Link
                    to="/dashboard/customer-contact"
                    className="btn bg-gray-600 shadow-gray-400 text-white flex items-center justify-start mb-1 is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="Customer Contact"
                  >
                    <FaComment />
                    <span className="is-drawer-close:hidden">
                      Customer Contact
                    </span>
                  </Link>
                </li>
                {/* products */}
                <li>
                  <Link
                    to="/dashboard/student"
                    className="btn bg-gray-600 shadow-gray-400 text-white flex items-center justify-start mb-1 is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="Products"
                  >
                    <FaShoppingCart />
                    <span className="is-drawer-close:hidden">Products</span>
                  </Link>
                </li>

                {/* add products */}
                <li>
                  <Link
                    to="/dashboard/add-tuition"
                    className="btn bg-gray-600 shadow-gray-400 text-white flex items-center justify-start mb-1 is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="Add Product"
                  >
                    <FaPlusSquare />
                    <span className="is-drawer-close:hidden">Add Product</span>
                  </Link>
                </li>
              </>
            )}
            {/* add hero photo */}
            <li>
              <Link
                to="/dashboard/add-hero-photo"
                className="btn bg-[#aba65e] shadow-[#aba65e] text-white flex items-center justify-start mb-1 is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Add Hero Photo"
              >
                <FaPlusSquare />
                <span className="is-drawer-close:hidden">Add Hero Photo</span>
              </Link>
            </li>
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
                className="btn bg-gray-600 shadow-gray-400 text-white flex items-center justify-start mb-1 gap-2
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
                className="btn bg-gray-600 shadow-gray-400 text-white flex items-center w-full is-drawer-close:tooltip is-drawer-close:tooltip-right"
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
