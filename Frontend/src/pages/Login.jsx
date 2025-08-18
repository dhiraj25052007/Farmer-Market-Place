// File: src/pages/Login.jsx
import { useState } from "react";
import React from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";
import { HiOutlineMail, HiOutlineLockClosed } from "react-icons/hi";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import customerImg from "../assets/CustomerImg.png";
import farmerImg from "../assets/FarmerImg.png";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });

      if (response.data?.token && response.data?.user) {
        login(response.data.token, response.data.user);
        const role = response.data.user.role;

        if (role === "farmer") {
          toast.success("Login Successful: Farmer");
          setTimeout(() => navigate("/farmer/dashboard1"), 1000);
        } else if (role === "customer") {
          toast.success("Login Successful: Customer", { duration: 1000 });
          setTimeout(() => navigate("/customer/dashboard1"), 1000);
        } else {
          navigate("/");
        }
      } else {
        setError("Invalid response from server");
      }
    } catch (err) {
      console.error("[LOGIN ERROR]", err);
      toast.error("Login Failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-cover bg-center bg-gradient-to-r from-green-100 to-lime-200 px-6">
      <div className="flex flex-col md:flex-row items-center justify-center gap-10">
        
        {/* Left Side Customer Image */}
        <motion.img
          src={customerImg}
          alt="Customer"
          className="w-80 h-110 object-contain"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        />

        {/* Login Form */}
        <motion.div
          className="w-full max-w-md bg-white bg-opacity-90 backdrop-blur-lg rounded-xl shadow-lg p-8"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h2 className="text-3xl font-extrabold text-center text-green-700 mb-6">
            Login to Your FarmFresh Account
          </h2>

          {error && (
            <p className="text-red-500 text-center mb-4 font-medium">{error}</p>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Input */}
            <motion.div
              whileFocus={{ scale: 1.02 }}
              className="flex items-center border border-gray-300 rounded-lg shadow-sm focus-within:ring-2 focus-within:ring-green-200 focus-within:border-green-600 overflow-hidden"
            >
              <span className="px-3 text-green-600 text-xl">
                <HiOutlineMail />
              </span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
                className="w-full px-3 py-2 outline-none"
              />
            </motion.div>

            {/* Password Input with Eye Toggle */}
            <motion.div
              whileFocus={{ scale: 1.02 }}
              className="flex items-center border border-gray-300 rounded-lg shadow-sm focus-within:ring-2 focus-within:ring-green-200 focus-within:border-green-600 overflow-hidden"
            >
              <span className="px-3 text-green-600 text-xl">
                <HiOutlineLockClosed />
              </span>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
                className="w-full px-3 py-2 outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="px-3 text-green-600 hover:text-green-800 focus:outline-none"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </motion.div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="accent-green-600" /> Remember me
              </label>
              <Link
                to="/forgot-password"
                className="text-green-600 hover:underline font-medium"
              >
                Forgot password?
              </Link>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              type="submit"
              className="w-full bg-gradient-to-r from-green-500 to-green-700 text-white py-2 rounded-lg shadow-md font-semibold hover:from-green-600 hover:to-green-800 transition-all"
            >
              Login
            </motion.button>
          </form>

          <div className="text-center mt-6">
            <p className="text-sm text-gray-700">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="text-green-600 font-semibold hover:underline"
              >
                Create one
              </Link>
            </p>
          </div>
        </motion.div>

        {/* Right Side Farmer Image */}
        <motion.img
          src={farmerImg}
          alt="Farmer"
          className="w-80 h-110 object-contain"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        />
      </div>
    </div>
  );
};

export default Login;
