// File: src/pages/Profile.jsx
import React from "react";
import { motion } from "framer-motion";
import { useAuth } from "../../context/AuthContext";
import CustomerAnimation from "../../components/CustomerAnimation";
import { Link } from "react-router-dom";

const Profile = () => {
  const { user } = useAuth();

  return (
    <motion.div
      className="px-6 pt-8 relative"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-10 relative">
        {/* Left Side: Welcome + Profile Card */}
        <motion.div
          className="flex flex-col items-center md:items-start z-10"  // ✅ bring above animation
          initial={{ x: -30, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl font-extrabold text-green-800 mb-6 drop-shadow-sm text-center md:text-left">
            Welcome, {user?.name || "Customer"}
          </h1>

          <motion.div
            className="bg-white w-80 shadow-2xl rounded-2xl p-6 flex flex-col items-center justify-center text-gray-800 relative z-10"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <div className="w-24 h-24 flex items-center justify-center bg-gradient-to-r from-pink-400 via-rose-500 to-red-400 text-white rounded-full text-4xl font-black shadow-lg mb-4">
              {user?.name?.[0]?.toUpperCase() || "C"}
            </div>
            <div className="text-center">
              <h2 className="text-xl font-bold mb-2 border-b pb-1">
                👤 Profile Details
              </h2>
              <p className="mb-1 text-base font-medium">
                <span className="font-semibold">Name:</span> {user?.name}
              </p>
              <p className="mb-1 text-base font-medium">
                <span className="font-semibold">Email:</span> {user?.email}
              </p>
              <p className="text-base font-medium">
                <span className="font-semibold">Role:</span> {user?.role}
              </p>
            </div>

            {/* Buttons Section */}
            <div className="flex gap-4 mt-6">
              <Link to="/customer/dashboard1/edit-profile">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition"
                >
                  Edit Profile
                </motion.button>
              </Link>
              <Link to="/">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 bg-pink-500 text-white font-semibold rounded-lg shadow-md hover:bg-pink-600 transition"
                >
                  Shop Now
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </motion.div>

        {/* Right Side: Animation */}
        <motion.div
          className="flex justify-center md:justify-start pointer-events-none" // ✅ prevents blocking clicks
          initial={{ x: 30, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <CustomerAnimation />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Profile;
