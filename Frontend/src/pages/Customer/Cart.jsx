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
      const res = await axios.get('http://localhost:5000/api/cart', {
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
        'http://localhost:5000/api/cart/remove',
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
      className="min-h-screen  py-10 px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl sm:text-5xl font-extrabold text-green-900 text-center mb-12 drop-shadow-xl">🛒 Your Cart 🛒</h2>

        {cartItems.length === 0 ? (
          <p className="text-gray-600">Your cart is empty. <Link to="/" className="text-blue-500">Go shopping!</Link></p>
        ) : (
          <div className="space-y-4">
            {cartItems.map(({ productId, quantity }) => (
              <motion.div
                key={productId._id}
                className="flex items-center justify-between bg-white p-4 rounded shadow-md hover:shadow-lg"
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-center gap-4">
                  <img
                    src={productId.imageUrl || 'https://via.placeholder.com/100'}
                    alt={productId.name}
                    className="w-20 h-20 object-cover rounded"
                  />
                  <div>
                    <h3 className="font-bold text-2xl text-gray-800">{productId.name}</h3>
                    <p className="text-sm text-gray-600 font-semibold">Price: ₹{productId.price} × {quantity}</p>
                  </div>
                </div>
                <button
                  onClick={() => removeFromCart(productId._id)}
                  className="text-red-500 border border-red-500 px-3 py-1 rounded hover:bg-red-500 hover:text-white transition"
                >
                  Remove
                </button>
              </motion.div>
            ))}

            <motion.div
              className="text-right mt-6 bg-white rounded p-4 shadow-md"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <p className="text-xl font-bold text-gray-800">Total: ₹{total.toFixed(2)}</p>
              <motion.button
                whileTap={{ scale: 0.95 }}
                whileHover={{ scale: 1.05 }}
                className="mt-4 bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 shadow-lg"
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
