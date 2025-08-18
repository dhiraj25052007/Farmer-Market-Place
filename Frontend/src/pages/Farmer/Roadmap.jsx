import React from 'react';
import { motion } from 'framer-motion';
import { FaSeedling, FaMobileAlt, FaBrain, FaWallet, FaGlobeAmericas } from 'react-icons/fa';

const roadmapItems = [
  {
    icon: <FaMobileAlt />,
    title: 'Mobile App Launch',
    quarter: '2025 Q3',
    desc: 'Android & iOS apps for seamless farmer-buyer interaction.',
  },
  {
    icon: <FaBrain />,
    title: 'AI Crop Prediction',
    quarter: '2025 Q4',
    desc: 'Get smart crop suggestions using real-time weather & soil data.',
  },
  {
    icon: <FaWallet />,
    title: 'Decentralized Payments',
    quarter: '2026 Q1',
    desc: 'Secure blockchain-based payments for transparency and trust.',
  },
  {
    icon: <FaGlobeAmericas />,
    title: 'Export Tools',
    quarter: '2026 Q2',
    desc: 'Global marketplace tools to help farmers sell internationally.',
  },
];

const Roadmap = () => {
  return (
    <div className=" py-20 px-4 md:px-12">
      <motion.h2
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-bold text-center text-green-900 mb-16"
      >
        🌿 FarmFresh Roadmap 🌿
      </motion.h2>

      <div className="relative max-w-4xl mx-auto">
        <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-green-400" />

        <div className="space-y-20">
          {roadmapItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -80 : 80 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className={`relative flex items-start ${
                index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
              } gap-6 md:gap-10`}
            >
              {/* Icon Bubble */}
              <div className="w-14 h-14 min-w-14 flex items-center justify-center bg-green-600 text-white rounded-full shadow-lg text-xl mt-2 z-10">
                {item.icon}
              </div>

              {/* Card */}
              <div className="bg-white rounded-xl shadow-md border border-green-100 px-6 py-4 w-full max-w-md">
                <p className="text-sm text-green-600 font-medium">{item.quarter}</p>
                <h3 className="text-lg font-bold text-green-900 mt-1">{item.title}</h3>
                <p className="text-green-700 mt-2 text-sm">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Roadmap;
