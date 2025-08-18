// File: src/components/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { FiFacebook, FiInstagram, FiTwitter, FiMail, FiPhone } from 'react-icons/fi';
import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-gradient-to-r from-green-700 to-lime-500 text-white px-6 py-10 mt-12 shadow-inner"
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-8">
        <div className="md:w-1/3">
          <h2 className="text-lg font-bold mb-2">Farm Fresh</h2>
          <p className="text-sm leading-relaxed">Bringing you the best organic produce directly from the farm to your doorstep.</p>
        </div>

       

        <div className="md:w-1/3">
         <Link to='/contact'className="text-lg font-bold mb-2">Connect</Link>
          <div className="flex gap-4 mb-3">
            <a href="#" title="Facebook" className="hover:text-green-300 transition"><FiFacebook size={20} /></a>
            <a href="#" title="Instagram" className="hover:text-green-300 transition"><FiInstagram size={20} /></a>
            <a href="#" title="Twitter" className="hover:text-green-300 transition"><FiTwitter size={20} /></a>
          </div>
          <p className="text-sm flex items-center gap-2"><FiMail /> support@farmfresh.com</p>
          <p className="text-sm flex items-center gap-2"><FiPhone /> +91-9876543210</p>
        </div>
      </div>
      <p className="text-center text-xs mt-6">&copy; {new Date().getFullYear()} Farm Fresh. All rights reserved.</p>
    </motion.footer>
  );
};

export default Footer;
