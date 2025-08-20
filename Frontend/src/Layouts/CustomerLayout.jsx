// File: src/layouts/CustomerLayout.jsx
import React, { useState } from "react";
import { Outlet, Link, useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import {
  FiHeart,
  FiHelpCircle,
  FiShoppingBag,
  FiShoppingCart,
  FiUser,
  FiLogOut,
  FiChevronLeft,
  FiChevronRight,
  FiChevronDown,
  FiChevronUp,
  FiMap,
} from "react-icons/fi";

const CustomerLayout = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(true);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(location.pathname); // track active path

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const menuItems = [
    { to: "profile", label: "Profile", icon: <FiUser /> },
    { to: "ViewOrder", label: "My Orders", icon: <FiShoppingBag /> },
    { to: "wishlist", label: "Wishlist", icon: <FiHeart /> },
    { to: "cart", label: "Cart", icon: <FiShoppingCart /> },
    { to: "FAQs", label: "FAQs", icon: <FiHelpCircle /> },
    { to: "roadmap", label: "Roadmap" ,icon: <FiMap /> },
    
  ];

  return (
    <div className="flex flex-col md:flex-row bg-gradient-to-r from-green-100 to-lime-200 min-h-screen">
      
      {/* ===== Desktop Sidebar ===== */}
      <motion.div
        initial={{ width: 260 }}
        animate={{ width: isOpen ? 260 : 80 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="hidden md:flex relative bg-gradient-to-b from-green-500 via-lime-500 to-yellow-400 text-white min-h-screen shadow-lg flex-col justify-between"
      >
        <div className="p-4">
          <h2
            className={`text-xl font-bold mb-6 transition-opacity duration-300 ${
              isOpen ? "opacity-100" : "opacity-0 hidden"
            }`}
          >
            Customer Dashboard
          </h2>

          <ul className="space-y-3">
            {menuItems.map((item, idx) => {
              const isActive = activeItem.includes(item.to);
              return (
                <li key={idx}>
                  <Link
                    to={item.to}
                    onClick={() => setActiveItem(item.to)}
                    className={`group flex items-center gap-2 px-2.5 py-1.5 rounded-full border transition-all duration-300 ease-in-out shadow-sm scale-100
                      ${
                        isActive
                          ? "bg-orange-400 text-white border-green-700 shadow-md"
                          : "bg-gradient-to-r from-green-100 to-green-200 text-green-800 border-green-200 hover:from-green-100 hover:to-green-200 hover:border-green-300 hover:shadow-md hover:scale-[1.03]"
                      }`}
                  >
                    <span className="text-lg">{item.icon}</span>
                    {isOpen && <span className="whitespace-nowrap">{item.label}</span>}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="p-4">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition-all duration-300 shadow-md hover:shadow-lg"
          >
            <FiLogOut />
            {isOpen && <span>Logout</span>}
          </button>
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="absolute top-1/2 right-[-14px] transform -translate-y-1/2 bg-green-600 text-white p-1 rounded-full shadow-md hover:bg-green-700 transition-colors"
        >
          {isOpen ? <FiChevronLeft /> : <FiChevronRight />}
        </button>
      </motion.div>

      {/* ===== Mobile Top Dropdown Sidebar ===== */}
      <div className="md:hidden w-full bg-gradient-to-b from-green-500 via-lime-500 to-yellow-400 text-white shadow-lg">
        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="w-full flex items-center justify-between px-4 py-3 font-bold text-lg"
        >
          Menu
          {isMobileOpen ? <FiChevronUp /> : <FiChevronDown />}
        </button>

        <AnimatePresence>
          {isMobileOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-2 gap-2 p-3"
            >
              {menuItems.map((item, idx) => {
                const isActive = activeItem.includes(item.to);
                return (
                  <Link
                    key={idx}
                    to={item.to}
                    onClick={() => {
                      setActiveItem(item.to);
                      setIsMobileOpen(false);
                    }}
                    className={`flex flex-col items-center justify-center font-semibold rounded-lg py-3 transition-all duration-300 shadow-md hover:shadow-lg
                      ${
                        isActive
                          ? "bg-green-500 text-white"
                          : "bg-white/90 text-green-700 hover:bg-white"
                      }`}
                  >
                    <span className="text-2xl mb-1">{item.icon}</span>
                    <span className="text-sm">{item.label}</span>
                  </Link>
                );
              })}

              <button
                onClick={() => {
                  handleLogout();
                  setIsMobileOpen(false);
                }}
                className="flex flex-col items-center justify-center bg-red-500 text-white font-semibold rounded-lg py-3 hover:bg-red-600 transition-all duration-300 shadow-md hover:shadow-lg"
              >
                <FiLogOut className="text-2xl mb-1" />
                <span className="text-sm">Logout</span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ===== Main Content ===== */}
      <motion.div
        className="flex-1 p-6"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Outlet />
      </motion.div>
    </div>
  );
};

export default CustomerLayout;
