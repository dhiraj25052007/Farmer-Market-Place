// File: src/pages/ViewOrder.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { motion } from "framer-motion";
import { BsBoxSeam } from "react-icons/bs";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const ViewOrder = () => {
  const { token } = useAuth();
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();
        const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        console.log(user._id);
        
        // if (!user?.id || !user?._id ) return;
        const res = await axios.get(
          `http://localhost:5000/api/orders/user/${user.id||user._id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        console.log(res.data);
        
        setOrders(res.data);
      } catch (err) {
        console.error("Fetch orders error:", err);
      }
    };
    if (token) fetchOrders();
  }, [token]);

// console.log(user);


  const handleCancel = async (id) => {
    const confirm = window.confirm(
      "Are you sure you want to cancel this order?"
    );
    if (!confirm) return;
    try {
      await axios.delete(`http://localhost:5000/api/orders/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrders((prev) => prev.filter((o) => o._id !== id));
      toast.success("Order cancelled successfully");
    } catch (err) {
      toast.error(err.response?.data?.error || "Cancel failed");
    }
  };

  const handleTrackOrder = (id) => {
    navigate(`/customer/dashboard1/track-order/${id}`);
  };

  return (
    <motion.div
      className="min-h-screen py-10 px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-5xl mx-auto">
        <h2 className="text-4xl sm:text-5xl font-extrabold text-green-900 text-center mb-12 drop-shadow-xl">
          📦 Your Orders 📦
        </h2>

        {orders.length === 0 ? (
          <p className="text-gray-600">No orders found. Start shopping now!</p>
        ) : (
          <div className="space-y-6">
            {orders.map((order, idx) => (
              <motion.div
                key={order._id}
                className="bg-white rounded-xl p-6 shadow hover:shadow-lg border-l-4 border-green-500"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.4 }}
              >
                {/* Order header */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-2">
                  <div className="flex items-center gap-3">
                    <BsBoxSeam className="text-green-600 text-3xl font-extrabold" />
                    <h3 className="text-xl sm:text-3xl font-bold text-gray-800">
                      Order #{order._id.slice(-6)}
                    </h3>
                  </div>
                </div>

                <p className="text-sm text-gray-700 mb-2 font-semibold">
                  Placed on: {new Date(order.createdAt).toLocaleString()}
                </p>
                <p className="text-sm text-gray-700 mb-2 font-semibold">
                  Payment:{" "}
                  {order.paymentMethod === "razorpay"
                    ? "Razorpay"
                    : "Cash on Delivery"}
                </p>

                {/* Items */}
                <div className="divide-y mt-4">
                  {order.items.map((item) => (
                    <div
                      key={item.productId._id}
                      className="flex flex-col sm:flex-row justify-between items-start sm:items-center py-3 gap-4"
                    >
                      <div className="flex items-center gap-4 w-full sm:w-auto">
                        <img
                          src={item.productId.imageUrl}
                          alt={item.productId.name}
                          className="w-16 h-16 object-cover rounded"
                        />
                        <div>
                          <h4 className="text-md font-bold text-gray-700">
                            {item.productId.name}
                          </h4>
                          <p className="text-sm text-gray-500 font-semibold">
                            Qty: {item.quantity}
                          </p>
                        </div>
                      </div>
                      <div className="text-green-700 font-bold w-full sm:w-auto text-left sm:text-right">
                        Original Price: ₹{item.quantity * item.price}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Total + Actions */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-4 gap-3 w-full">
                  <p className="text-lg font-bold text-green-800 flex flex-wrap items-center">
                    Discounted Total
                    <span className="text-green-800 font-normal ml-1">
                      (Including Charges)
                    </span>
                    : ₹{order.total}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                    <button
                      onClick={() => handleTrackOrder(order._id)}
                      className="bg-gradient-to-r from-cyan-400 to-blue-500

 text-white px-4 py-2 rounded hover:bg-blue-600 transition hover:scale-110 w-full sm:w-auto"
                    >
                      Track Order
                    </button>
                    <button
                      onClick={() => handleCancel(order._id)}
                      className="bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500

 text-white px-4 py-2 rounded  transition hover:scale-110 w-full sm:w-auto"
                    >
                      Cancel Order
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ViewOrder;
