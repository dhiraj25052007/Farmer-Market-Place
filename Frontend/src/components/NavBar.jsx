// File: src/components/NavBar.jsx
import { Link, useNavigate } from 'react-router-dom';
import {
  FiUser,
  FiHome,
  FiInfo,
  FiPhone,
  FiGrid
} from 'react-icons/fi';
import { useAuth } from '../context/AuthContext.jsx';
import React, { useState } from 'react';
import img1 from '../assets/img1.png';
import { motion, AnimatePresence } from 'framer-motion';
import DarkModeToggle from './DarkModeToggle.jsx';
import { FaCertificate } from 'react-icons/fa';
import { Award } from 'lucide-react';

const NavBar = () => {
  const { loggedIn } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  let user = null;
  try {
    user = JSON.parse(localStorage.getItem('user'));
  } catch (e) {
    user = null;
  }

  const dashboardPath =
    user?.role === 'farmer'
      ? '/farmer/dashboard1'
      : '/customer/dashboard1';

  const dashboardLabel =
    user?.role === 'farmer' ? 'Farmer Hub' : 'Customer Hub';

  const menuItems = [
    { to: '/', label: 'Home', icon: <FiHome /> },
    { to: '/about', label: 'About', icon: <FiInfo /> },

    { to: '/contact', label: 'Contact', icon: <FiPhone /> },
        { to: '/certificate', label: 'Certification', icon: <Award /> },

    ...(loggedIn
      ? [{ to: dashboardPath, label: dashboardLabel, icon: <FiGrid /> }]
      : [{ to: '/login', label: 'Login', icon: <FiUser /> }])
  ];

  return (
    <motion.nav
      className="flex flex-wrap items-center justify-between px-6 py-1 bg-gradient-to-r from-green-700 to-lime-500 text-white shadow-lg sticky top-0 z-50"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      {/* Logo */}
      <div className="flex items-center gap-3">
        <img src={img1} alt="logo" className="w-14 h-14 rounded-full" />
        <Link to="/" className="text-2xl font-extrabold tracking-tight">
          Farm Fresh
        </Link>
      </div>

      {/* Mobile Menu Toggle */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="md:hidden focus:outline-none text-white text-2xl"
      >
        ☰
      </button>

      {/* Desktop Menu */}
      <div className="hidden md:flex md:items-center gap-4">
        {menuItems.map((item, idx) => (
          <Link
            key={idx}
            to={item.to}
            className="flex items-center gap-2 px-4 py-1 rounded-full shadow-md bg-gradient-to-r from-white to-gray-100 text-green-700 hover:scale-105 transition-all duration-300  font-bold"
          >
            {item.icon} {item.label}
          </Link>
        ))}
        
      </div>

      {/* Mobile Menu Grid */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden w-full mt-4 grid grid-cols-2 gap-3"
          >
            {menuItems.map((item, idx) => (
              <Link
                key={idx}
                to={item.to}
                onClick={() => setMenuOpen(false)}
                className="flex flex-col items-center justify-center bg-gradient-to-br from-white to-gray-100 text-green-700 font-semibold rounded-xl shadow-lg p-4 h-28 hover:scale-105 transition-all duration-300"
              >
                <span className="text-3xl mb-1">{item.icon}</span>
                <span className="text-sm">{item.label}</span>
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default NavBar;
