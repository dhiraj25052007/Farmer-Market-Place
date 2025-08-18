// File: src/pages/OrderTracking.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import { useAuth } from "../../context/AuthContext";
import { BsBoxSeam } from "react-icons/bs";
import { MdCheck } from "react-icons/md";
import DeliveryImg from "../../assets/Delivery.png"; // ✅ Make sure path is correct

const steps = ["Pending", "Processing", "Shipped", "Delivered"];

const OrderTracking = () => {
  const { id } = useParams();
  const { token } = useAuth();
  const [status, setStatus] = useState("Pending");
  const [lastUpdate, setLastUpdate] = useState("");

  // ✅ Adjustable image size here
  const imageWidth = "450px"; // Change width here
  const imageHeight = "400px"; // Change height here

  const fetchStatus = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/orders/track/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setStatus(res.data.status);
      setLastUpdate(new Date(res.data.lastUpdate).toLocaleString());
    } catch (err) {
      console.error("Error fetching order status", err);
    }
  };

  useEffect(() => {
    if (token) {
      fetchStatus();
      const interval = setInterval(fetchStatus, 2000);
      return () => clearInterval(interval);
    }
  }, [token]);

  const currentStepIndex = steps.indexOf(status);

  return (
    <motion.div
      className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-8 p-6 bg-white shadow-xl rounded-2xl border border-green-200"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Tracking Section */}
      <motion.div
        className="flex-1"
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center gap-3 mb-6">
          <BsBoxSeam className="text-green-700 text-3xl" />
          <h2 className="text-3xl font-bold text-green-700">Order Tracking</h2>
        </div>

        <p className="mb-2 text-gray-700">
          <strong>Order ID:</strong> {id}
        </p>
        <p className="mb-6 text-gray-700">
          <strong>Last Update:</strong> {lastUpdate}
        </p>

        {/* Progress Steps */}
        <div className="relative flex items-center justify-between mb-10">
          {/* Full progress line always visible */}
          <div className="absolute left-0 right-0 top-[20px] h-1 bg-gray-300 z-0">
            <div
              className="h-1 bg-green-500 transition-all duration-500"
              style={{
                width: `${(currentStepIndex / (steps.length - 1)) * 100}%`,
              }}
            ></div>
          </div>

          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              className="flex-1 flex flex-col items-center z-10"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              <div
                className={`w-10 h-10 flex items-center justify-center rounded-full border-2 font-bold shadow-md transition-all
                  ${
                    idx < currentStepIndex
                      ? "bg-green-500 border-green-500 text-white"
                      : idx === currentStepIndex
                      ? status === "Delivered"
                        ? "bg-green-500 border-green-500 text-white"
                        : "bg-yellow-400 border-yellow-400 text-white"
                      : "bg-gray-200 border-gray-300 text-gray-500"
                  }`}
              >
                {status === "Delivered" && idx === steps.length - 1 ? (
                  <MdCheck className="text-white text-xl" />
                ) : (
                  idx + 1
                )}
              </div>
              <span
                className={`mt-2 text-sm font-semibold ${
                  idx <= currentStepIndex ? "text-green-700" : "text-gray-500"
                }`}
              >
                {step}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Order Status Message */}
        <div className="mt-8">
          <h3 className="text-xl font-bold text-green-800 mb-4">Order Updates</h3>
          <motion.div
            className="p-4 bg-green-50 border border-green-200 rounded-lg shadow-sm"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            {status === "Pending" && (
              <p className="text-green-900 font-semibold">
                Your order has been placed successfully and is pending confirmation.
              </p>
            )}
            {status === "Processing" && (
              <p className="text-green-900 font-semibold">
                Your order is being processed by the farmer.
              </p>
            )}
            {status === "Shipped" && (
              <p className="text-green-900 font-semibold">
                Your order has been shipped and is on the way.
              </p>
            )}
            {status === "Delivered" && (
              <p className="text-green-900 font-semibold">
                Your order has been delivered. Enjoy your purchase!
              </p>
            )}
            <span className="text-xs text-gray-500 block mt-2">
              Last updated: {lastUpdate}
            </span>
          </motion.div>
        </div>
      </motion.div>

      {/* Delivery Image Section */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="flex justify-center"
      >
        <img
          src={DeliveryImg}
          alt="Delivery"
          style={{
            width: imageWidth,
            height: imageHeight,
            objectFit: "contain",
          }}
          className="drop-shadow-lg"
        />
      </motion.div>
    </motion.div>
  );
};

export default OrderTracking;
