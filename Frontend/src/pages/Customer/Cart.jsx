// File: src/pages/CartPage.jsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';
import OrderOptions from '../Customer/OrderOption';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

const Cart = () => {
  const { token } = useAuth();
  const [cartItems, setCartItems] = useState([]);
  const [showOrder, setShowOrder] = useState(false);

  const fetchCart = async () => {
    try {
      const res = await axios.get('https://farmer-market-place-c2wq.onrender.com/api/cart', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCartItems(res.data.items);
    } catch (err) {
      console.error('Fetch cart error:', err);
    }
  };

  const removeFromCart = async (productId) => {
    try {
      await axios.post(
        'https://farmer-market-place-c2wq.onrender.com/api/cart/remove',
        { productId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setCartItems((prev) => prev.filter((item) => item.productId._id !== productId));
      toast.success("Removed From Cart")
    } catch (err) {
      console.error('Remove from cart error:', err);
    }
  };

  const total = cartItems.reduce(
    (sum, item) => sum + item.productId.price * item.quantity,
    0
  );

  useEffect(() => {
    if (token) fetchCart();
  }, [token]);

  return (
    <motion.div
      className="min-h-screen py-10 px-4 sm:px-6 lg:px-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-green-900 text-center mb-10 sm:mb-12 drop-shadow-xl">
          🛒 Your Cart 🛒
        </h2>

        {cartItems.length === 0 ? (
          <p className="text-gray-600 text-center">
            Your cart is empty.{" "}
            <Link to="/" className="text-blue-500 hover:underline">
              Go shopping!
            </Link>
          </p>
        ) : (
          <div className="space-y-4">
            {cartItems.map(({ productId, quantity }) => (
              <motion.div
                key={productId._id}
                className="flex flex-col sm:flex-row items-center sm:justify-between gap-4 bg-white p-4 rounded-lg shadow-md hover:shadow-lg"
                whileHover={{ scale: 1.02 }}
              >
                {/* Product details */}
                <div className="flex items-center gap-4 w-full sm:w-auto">
                  <img
                    src={productId.imageUrl || 'https://via.placeholder.com/100'}
                    alt={productId.name}
                    className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded"
                  />
                  <div className="flex flex-col">
                    <h3 className="font-bold text-lg sm:text-xl text-gray-800">
                      {productId.name}
                    </h3>
                    <p className="text-sm sm:text-base text-gray-600 font-semibold">
                      Price: ₹{productId.price} × {quantity}
                    </p>
                  </div>
                </div>

                {/* Remove button */}
                <div className="w-full sm:w-auto flex justify-end">
                  <button
                    onClick={() => removeFromCart(productId._id)}
                    className="text-red-500 border border-red-500 px-3 py-1 rounded hover:bg-red-500 hover:text-white transition text-sm sm:text-base"
                  >
                    Remove
                  </button>
                </div>
              </motion.div>
            ))}

            {/* Total and Order Section */}
            <motion.div
              className="text-center sm:text-right mt-6 bg-white rounded-lg p-4 shadow-md"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <p className="text-lg sm:text-xl font-bold text-gray-800">
                Total: ₹{total.toFixed(2)}
              </p>
              <motion.button
                whileTap={{ scale: 0.95 }}
                whileHover={{ scale: 1.05 }}
                className="mt-4 bg-green-600 text-white px-5 sm:px-6 py-2 rounded-lg hover:bg-green-700 shadow-lg text-sm sm:text-base"
                onClick={() => setShowOrder(true)}
              >
                Place Order
              </motion.button>
            </motion.div>

            {showOrder && (
              <div className="mt-6">
                <OrderOptions
                  items={cartItems.map((item) => ({
                    productId: item.productId,
                    quantity: item.quantity,
                    price: item.productId.price,
                  }))}
                  total={total}
                />
              </div>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default Cart;
