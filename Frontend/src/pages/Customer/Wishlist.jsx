// File: src/pages/Wishlist.jsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';

import { motion } from 'framer-motion';
import { AiFillStar, AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

const Wishlist = () => {
  const { token } = useAuth();
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    axios.get('https://farmer-market-place-c2wq.onrender.com/api/wishlist', {
      headers: { Authorization: `Bearer ${token}` },
    }).then(res => setWishlist(res.data.products));
  }, [token]);

  const removeFromWishlist = async (id) => {
    await axios.post(`https://farmer-market-place-c2wq.onrender.com/api/wishlist/remove`, {
      productId: id
    }, {
      headers: { Authorization: `Bearer ${token}` }
    });
    toast.success("Removed From Wishlist")
    setWishlist(wishlist.filter(p => p._id !== id));
  };

  const renderStars = (rating) =>
    Array.from({ length: 5 }, (_, i) => (
      <AiFillStar key={i} className={i < rating ? 'text-yellow-400' : 'text-gray-300'} />
    ));

  return (
    <div className="min-h-screen  py-10 px-4">
      <h1 className="text-4xl sm:text-5xl font-extrabold text-green-900 text-center mb-12 drop-shadow-xl">❤️ My Wishlist ❤️</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {wishlist.map((product, idx) => (
          <motion.div
            key={product._id}
            className="bg-white p-4 rounded-xl shadow-lg hover:shadow-green-300 relative"
            whileHover={{ scale: 1.03 }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
          >
            <button
              onClick={() => removeFromWishlist(product._id)}
              className="absolute top-3 right-3 text-red-500"
            >
              <AiFillHeart size={20} />
            </button>
            <Link to={`/products/${product._id}`}>
              <img
                src={product.imageUrl || 'https://via.placeholder.com/150'}
                className="h-40 w-full object-cover rounded mb-3"
                alt={product.name}
              />
              <h3 className="font-semibold text-lg text-center">{product.name}</h3>
              <p className="text-center text-green-600 font-semibold mt-1">₹{product.price}</p>
              <div className="flex justify-center mt-2">{renderStars(product.rating || 0)}</div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
