// File: src/pages/Certificates.jsx
import React from "react";
import { motion } from "framer-motion";

// Import certificate images from assets
import OrganicCert from "../assets/c1.png";   // update names as per your files
import IsoCert from "../assets/c2.png";
import FssaiCert from "../assets/c3.png";

const Certificates = () => {
  const certificates = [
      { title: "ISO Certification", img: IsoCert },
    { title: "Organic Farming Certificate", img: OrganicCert },
  
    { title: "FSSAI License", img: FssaiCert },
  ];

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-r from-green-100 to-lime-200 py-16 px-6 lg:px-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <motion.h2
        className="text-5xl font-extrabold text-center text-green-800 mb-14"
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        📜 Our Certificates
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 place-items-center">
        {certificates.map((cert, idx) => (
          <motion.div
            key={idx}
            className="bg-white rounded-2xl shadow-xl p-6 flex flex-col items-center hover:shadow-green-300 transition-shadow duration-300"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: idx * 0.2, duration: 0.5 }}
            whileHover={{ scale: 1.05 }}
          >
            <img
              src={cert.img}
              alt={cert.title}
              className="w-[300px] h-[400px] object-contain rounded-lg shadow-md mb-4"
            />
            <h3 className="text-xl font-semibold text-green-700">{cert.title}</h3>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Certificates;
