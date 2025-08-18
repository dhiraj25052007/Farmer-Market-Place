// File: src/pages/FarmerDashboard.jsx
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../../context/AuthContext";
import FarmerAnimation from "../../components/FarmerAnimation";
import { FiActivity, FiBell, FiHeart, FiInbox, FiMap, FiPackage, FiPlusCircle, FiTrendingUp } from "react-icons/fi";

const FarmerDashboard = () => {
  const { user } = useAuth();

  return (
    <div className="flex flex-col md:flex-row bg-gradient-to-r from-green-100 to-lime-200 min-h-screen">
      {/* Sidebar */}
      <div className="w-full md:w-64 bg-gradient-to-r from-green-500 via-lime-500 to-yellow-300 text-white p-4">
        <h2 className="text-xl font-bold mb-4">Farmer Dashboard</h2>
        <ul className="space-y-2">
          {/* <li><Link to="/dashboard/farmeranimation" className="hover:underline">Dashboard Home</Link></li> */}
          <li>
            <Link
              to="/dashboard/farmer/add-product"
              className="bg-white text-green-700 font-semibold px-4 py-2 rounded flex items-center gap-2 hover:bg-green-100 transition"
            >
              <FiPlusCircle />
              Add Product
            </Link>
          </li>
          <li>
            <Link
              to="/dashboard/farmer/products"
               className="bg-white text-green-700 font-semibold px-4 py-2 rounded flex items-center gap-2 hover:bg-green-100 transition"
            >
              <FiPackage />
              My Products
            </Link>
          </li>
          <li>
            <Link
              to="/dashboard/farmer/stats"
               className="bg-white text-green-700 font-semibold px-4 py-2 rounded flex items-center gap-2 hover:bg-green-100 transition"
            >
              <FiTrendingUp/>
             Insights
            </Link>
          </li>
          <li>
            <Link
              to="/dashboard/farmer/roadmap"
              className="bg-white text-green-700 font-semibold px-4 py-2 rounded flex items-center gap-2 hover:bg-green-100 transition"
            >
              <FiMap />
              Roadmap
            </Link>
          </li>
          <li>
            <Link
              to="/dashboard/farmer/notification"
              className="bg-white text-green-700 font-semibold px-4 py-2 rounded flex items-center gap-2 hover:bg-green-100 transition"
            >
              <FiBell/>
              Notification
            </Link>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <motion.div
        className="flex-1 p-6"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="text-2xl font-bold mb-4">
          Welcome, {user?.name || "Farmer"}
        </h1>

     <div className="bg-gray-100 shadow rounded p-4 flex items-center gap-6">
  <div className="w-16 h-16 flex items-center justify-center bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600 text-white rounded-full text-2xl font-bold shadow-md">
    {user?.name?.[0]?.toUpperCase() || 'C'}
  </div>
  <div>
    <h2 className="text-lg font-bold mb-2">Profile</h2>
    <p><strong>Name:</strong> {user?.name}</p>
    <p><strong>Email:</strong> {user?.email}</p>
    <p><strong>Role:</strong> {user?.role}</p>
  </div>
</div>
        {/* <FarmerAnimation/> */}
      </motion.div>
    </div>
  );
};

export default FarmerDashboard;
