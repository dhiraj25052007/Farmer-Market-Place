import React from "react";
import { motion } from "framer-motion";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import FarmerAnimation from "../../components/FarmerAnimation";
import { FiUser } from "react-icons/fi";

const Fprofile = () => {
  const { user } = useAuth();

  return (
    <motion.div
      className="flex-1 p-6"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4 }}
    >
      <h1 className="text-2xl font-bold mb-4">
        Welcome, {user?.name || "Farmer"}
      </h1>

      {/* Profile Card */}
      <div
        className="
          bg-gray-100 shadow-2xl rounded-2xl 
          p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-6
        "
      >
        {/* Left Side Profile Info */}
        <div className="flex items-center gap-6">
          <div
            className="
              flex items-center justify-center bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600 
              text-white font-bold shadow-md rounded-full
              w-16 h-16 text-2xl
              max-md:w-24 max-md:h-24 max-md:text-3xl
            "
          >
            {user?.name?.[0]?.toUpperCase() || "C"}
          </div>
          <div className="max-md:text-lg">
            <h2 className="text-lg font-bold mb-2 max-md:text-xl">Profile</h2>
            <p>
              <strong> Name:</strong> {user?.name}
            </p>
            <p>
              <strong>Email:</strong> {user?.email}
            </p>
            <p>
              <strong>Role:</strong> {user?.role}
            </p>
          </div>
        </div>

        {/* Desktop Edit Button (right side) */}
        <div className="hidden md:block">
          <Link to="/farmer/dashboard1/edit-profile">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-green-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-700 transition"
            >
              Edit Profile
            </motion.button>
          </Link>
        </div>
      </div>

      {/* Mobile Edit Button (below card) */}
      <div className="mt-4 md:hidden flex justify-center z-50">
        <Link to="/farmer/dashboard1/edit-profile">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-green-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-700 transition"
          >
            Edit Profile
          </motion.button>
        </Link>
      </div>

      {/* Animation */}
      <div className="mt-6 max-md:scale-150 relative z-0 pointer-events-none">
        <FarmerAnimation />
      </div>
    </motion.div>
  );
};

export default Fprofile;
