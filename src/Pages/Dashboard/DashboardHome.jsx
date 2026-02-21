// src/pages/Dashboard/DashboardHome.jsx
import React, { useEffect, useState } from "react";
import { FaBirthdayCake, FaShoppingCart, FaUsers } from "react-icons/fa";
import useAxiosSecure from "../../Hooks/useAxios";

const DashboardHome = () => {
  const axiosSecure = useAxiosSecure();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalProducts: 0,
  });
  const [user, setUser] = useState({
    activeUser: 0,
  });

  useEffect(() => {
    const fetchAllStats = async () => {
      try {
        const productsRes = await axiosSecure.get("/dashboard/all-products");
        const usersRes = await axiosSecure.get("/dashboard/all-users");

        setStats({
          totalProducts: productsRes.data.totalProducts,
        });

        setUser({
          totalUsers: usersRes.data.totalUsers,
        });
      } catch (err) {
        console.error("Error fetching dashboard stats:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAllStats();
  }, [axiosSecure]);

  if (loading)
    return (
      <div className="flex items-center justify-center h-96">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );

  return (
    <div className="p-6 space-y-8">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="stats shadow bg-linear-to-r from-gray-50 to-gray-100 rounded-xl ">
          <div className="stat">
            <div className="stat-figure text-amber-500">
              <FaShoppingCart className="text-3xl opacity-30" />
            </div>
            <div className="stat-title font-semibold text-xl text-black">
              Total Products
            </div>
            <div className="stat-value text-gray-400">
              {stats.totalProducts}
            </div>
          </div>
        </div>

        <div className="stats shadow bg-linear-to-r from-green-50 to-emerald-50 rounded-xl">
          <div className="stat">
            <div className="stat-figure text-green-200">
              <FaUsers className="text-3xl opacity-90" />
            </div>
            <div className="stat-title text-xl font-semibold text-black">
              Active Users
            </div>
            <div className="stat-value text-green-500">{user.totalUsers}</div>
          </div>
        </div>
      </div>

      {/* Description Text */}
      {/* <div className="text-center text-gray-600 mt-6">
        Welcome to your dashboard! Here you can see the total number of products
        available and how many active users are currently using the platform.
      </div> */}

      <div className="text-center text-gray-700 mt-12 px-6 max-w-4xl mx-auto bg-linear-to-r from-gray-50 to-gray-100  p-8 rounded-2xl shadow-lg">
        <h2 className="text-3xl md:text-5xl font-extrabold mb-6 text-gray-600">
          Welcome to Your Dashboard!
        </h2>
        <p className="text-center md:text-xl text-gray-600 mt-6">
          Welcome to your dashboard! Here you can see the total number of
          products available and how many active users are currently using the
          platform.
        </p>
      </div>
    </div>
  );
};

export default DashboardHome;
