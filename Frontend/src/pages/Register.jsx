// File: src/pages/Register.jsx
import { useState } from "react";
import React from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { FaUser, FaEnvelope, FaLock, FaUserTag, FaEye, FaEyeSlash } from "react-icons/fa";
import logoImage from "../assets/F&C.png";

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("customer");
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://farmer-market-place-c2wq.onrender.com/api/auth/register", {
        name,
        email,
        password,
        role,
      });
      toast.success("Registration Successful !!", { duration: 1000 });
      setTimeout(() => navigate("/login"), 1000);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.error || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-100 to-lime-200 px-6">
      <div className="flex flex-col md:flex-row items-center justify-center gap-10">
        
        {/* Left Side Image */}
        <motion.img
          src={logoImage}
          alt="FarmFresh Logo"
          className="w-120 h-120 object-contain"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        />

        {/* Right Side Register Form */}
        <motion.div
          className="w-full max-w-md bg-white bg-opacity-90 backdrop-blur-lg rounded-xl shadow-lg p-8 mb-8"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h2 className="text-3xl font-extrabold text-center text-green-700 mb-6">
            Create Your Account
          </h2>

          {error && (
            <p className="text-red-500 text-center mb-4 font-medium">{error}</p>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name Field */}
            <div className="relative">
              <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-600" />
              <motion.input
                whileFocus={{ scale: 1.02 }}
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Full Name"
                required
                className="w-full pl-10 border border-gray-300 px-4 py-2 rounded-lg shadow-sm focus:outline-none focus:border-green-600 focus:ring-2 focus:ring-green-200 transition-all"
              />
            </div>

            {/* Email Field */}
            <div className="relative">
              <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-600" />
              <motion.input
                whileFocus={{ scale: 1.02 }}
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
                className="w-full pl-10 border border-gray-300 px-4 py-2 rounded-lg shadow-sm focus:outline-none focus:border-green-600 focus:ring-2 focus:ring-green-200 transition-all"
              />
            </div>

            {/* Password Field */}
            <div className="relative">
              <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-600" />
              <motion.input
                whileFocus={{ scale: 1.02 }}
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
                className="w-full pl-10 pr-10 border border-gray-300 px-4 py-2 rounded-lg shadow-sm focus:outline-none focus:border-green-600 focus:ring-2 focus:ring-green-200 transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-600"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            {/* Role Field */}
            <div className="relative">
              <FaUserTag className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-600" />
              <motion.select
                whileFocus={{ scale: 1.02 }}
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full pl-10 border border-gray-300 px-4 py-2 rounded-lg shadow-sm focus:outline-none focus:border-green-600 focus:ring-2 focus:ring-green-200 transition-all"
              >
                <option value="customer">Customer</option>
                <option value="farmer">Farmer</option>
              </motion.select>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              type="submit"
              className="w-full bg-gradient-to-r from-green-500 to-green-700 text-white py-2 rounded-lg shadow-md font-semibold hover:from-green-600 hover:to-green-800 transition-all"
            >
              Register
            </motion.button>
          </form>

          <div className="text-center mt-6">
            <p className="text-sm text-gray-700">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-green-600 font-semibold hover:underline"
              >
                Login
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Register;
