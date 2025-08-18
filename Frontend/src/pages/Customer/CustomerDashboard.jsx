// File: src/pages/CustomerDashboard.jsx
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../../context/AuthContext";
import { FiBox, FiHeart, FiHelpCircle, FiShoppingBag, FiShoppingCart } from "react-icons/fi";
import CustomerAnimation from "../../components/CustomerAnimation";

const CustomerDashboard = () => {
  const { user } = useAuth();

  return (
    <div className="flex flex-col md:flex-row bg-gradient-to-r from-green-100 to-lime-200 min-h-screen">
      {/* Sidebar */}
      <div className="w-full md:w-64  bg-gradient-to-r from-green-500 via-lime-500 to-yellow-300 text-white p-4">
        <h2 className="text-xl font-bold mb-4">Customer Dashboard</h2>
        <ul className="space-y-2">
          {/* <li>
            <Link to="/dashboard/customeranimation" className="bg-white text-green-700 font-semibold px-4 py-2 rounded flex items-center gap-2 hover:bg-green-100 transition">
              Dashboard Home
            </Link>
          </li> */}
          <li>
            <Link to="/dashboard/customer/ViewOrder" className="bg-white text-green-700 font-semibold px-4 py-2 rounded flex items-center gap-2 hover:bg-green-100 transition">
             <FiShoppingBag/> My Orders
            </Link>
          </li>
            {/* <li>
            <Link to="/customer/FAQs" className="bg-white text-green-700 font-semibold px-4 py-2 rounded flex items-center gap-2 hover:bg-green-100 transition">
             <FiHelpCircle/> FAQs
            </Link>
          </li> */}
          <li>
            {" "}
            <Link
              to="/dashboard/customer/wishlist"
              className="bg-white text-green-700 font-semibold px-4 py-2 rounded flex items-center gap-2 hover:bg-green-100 transition"
            >
              <FiHeart /> Wishlist
            </Link>
          </li>
           <li>
            <Link to="/dashboard/customer/cart" className="bg-white text-green-700 font-semibold px-4 py-2 rounded flex items-center gap-2 hover:bg-green-100 transition">
             <FiShoppingCart/> Cart
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
          Welcome, {user?.name || "Customer"}
        </h1>

       <div className="bg-gray-100 shadow rounded p-4 flex items-center gap-6">
  <div className="w-16 h-16 flex items-center justify-center bg-gradient-to-r from-pink-400 via-rose-500 to-red-400 text-white rounded-full text-2xl font-bold shadow-md">
    {user?.name?.[0]?.toUpperCase() || 'C'}
  </div>
  <div>
    <h2 className="text-lg font-semibold mb-2">Profile</h2>
    <p><strong>Name:</strong> {user?.name}</p>
    <p><strong>Email:</strong> {user?.email}</p>
    <p><strong>Role:</strong> {user?.role}</p>
  </div>
</div>
        {/* <CustomerAnimation/> */}
      </motion.div>
    </div>
  );
};

export default CustomerDashboard;
