// src/pages/Dashboard/DashboardHome.jsx
import React, { useEffect, useState } from "react";
import { FaBoxOpen, FaUsers } from "react-icons/fa";
import { motion } from "framer-motion";
import useAxiosSecure from "../../Hooks/useAxios";
import { SiWelcometothejungle } from "react-icons/si";

const DashboardHome = () => {
  const axiosSecure = useAxiosSecure();

  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalProducts: 0,
  });

  const [user, setUser] = useState({
    totalUsers: 0,
  });

  useEffect(() => {
    const fetchAllStats = async () => {
      try {
        const productsRes = await axiosSecure.get("/dashboard/all-products");
        const usersRes = await axiosSecure.get("/dashboard/all-users");

        setStats({
          totalProducts: productsRes.data.totalProducts || 0,
        });

        setUser({
          totalUsers: usersRes.data.totalUsers || 0,
        });
      } catch (error) {
        console.error("Dashboard Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllStats();
  }, [axiosSecure]);

  if (loading) {
    return (
      <div className="flex h-[70vh] items-center justify-center">
        <span className="loading loading-spinner loading-lg text-black"></span>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 md:p-8">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="rounded bg-linear-to-r from-black via-gray-900 to-black p-8 md:p-12 text-white shadow-xl"
      >
        <p className="text-xs uppercase tracking-[5px] text-gray-400">
          LUNOR ADMIN PANEL
        </p>

        <h1 className="flex items-center gap-2 mt-4 text-4xl md:text-6xl font-bold">
          Welcome Back <SiWelcometothejungle />
        </h1>

        <p className="mt-4 max-w-2xl text-gray-300 text-sm md:text-base">
          Manage products, users, and monitor your fashion store from a single
          dashboard.
        </p>
      </motion.div>

      {/* Stats Cards */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Products */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="group relative overflow-hidden rounded bg-white p-6 shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300"
        >
          <div className="absolute top-0 left-0 h-1 w-full bg-black"></div>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm font-medium">
                Total Products
              </p>

              <h2 className="mt-3 text-5xl font-bold text-black">
                {stats.totalProducts}
              </h2>
            </div>

            <div className="p-3">
              <FaBoxOpen className="text-3xl text-black" />
            </div>
          </div>
        </motion.div>

        {/* Users */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="group relative overflow-hidden rounded bg-white p-6 shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300"
        >
          <div className="absolute top-0 left-0 h-1 w-full bg-gray-500"></div>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm font-medium">Total Users</p>

              <h2 className="mt-3 text-5xl font-bold text-black">
                {user.totalUsers}
              </h2>
            </div>

            <div className="p-3">
              <FaUsers className="text-3xl text-black" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Overview Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="mt-8 rounded bg-white border border-gray-100 p-8 shadow-sm"
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-black">
              Store Overview
            </h2>

            <p className="mt-4 text-gray-600 leading-8 max-w-3xl">
              Welcome to the LUNOR administration dashboard. Monitor products,
              manage users, and keep track of your store’s performance from one
              centralized location.
            </p>
          </div>

          <div className="rounded bg-gray-50 border border-gray-200 px-6 py-5 text-center min-w-[220px]">
            <p className="text-xs uppercase tracking-[4px] text-gray-500">
              Brand
            </p>

            <h3 className="mt-2 text-2xl font-bold tracking-[4px] text-black">
              LUNOR
            </h3>

            <p className="text-xs tracking-[3px] text-gray-500 mt-1">
              EST VINTAGE
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default DashboardHome;
