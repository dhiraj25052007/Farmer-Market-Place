// File: src/pages/MyProducts.jsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { motion } from 'framer-motion';
import { Star, Trash2, Pencil, RotateCcw } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { AiFillStar } from 'react-icons/ai';

const MyProducts = () => {
  const { token, user } = useAuth();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const fetchProducts = async () => {
    try {
      const res = await axios.get('https://farmer-market-place-c2wq.onrender.com/api/products');
      const userProducts = res.data.filter(p => p.farmerId === user?.id||user._id);
      setProducts(userProducts);
      setFiltered(userProducts);
    } catch (err) {
      setError('Failed to load products');
    } finally {
      setLoading(false);
    }
  };
// console.log(user);

  useEffect(() => {
    fetchProducts();
  }, [user]);

  useEffect(() => {
    let result = [...products];
    if (search) {
      result = result.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));
    }
    if (category) {
      result = result.filter(p => p.category.toLowerCase() === category.toLowerCase());
    }
    setFiltered(result);
    setCurrentPage(1);
  }, [search, category, products]);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    try {
      await axios.delete(`https://farmer-market-place-c2wq.onrender.com/api/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setProducts(products.filter(p => p._id !== id));
    } catch (err) {
      alert('Failed to delete product');
    }
  };

  const handleEdit = (product) => {
    navigate('/farmer/dashboard1/editproducts', { state: { product } });
  };

  const handleReset = () => {
    setSearch('');
    setCategory('');
  };

  const renderStars = (rating) => (
    <div className="flex gap-1">{
      Array.from({ length: 5 }, (_, i) => (
        <AiFillStar key={i} className={i < rating ? 'text-yellow-400' : 'text-gray-300'} />
      ))
    }</div>
  );

  const uniqueCategories = [...new Set(products.map(p => p.category))];

  if (loading) {
    return <p className="text-center mt-20 text-lg text-gray-500 animate-pulse">Loading products...</p>;
  }

  if (error) {
    return <p className="text-center mt-20 text-red-600 font-semibold">{error}</p>;
  }

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const currentItems = filtered.slice(startIdx, startIdx + itemsPerPage);

  return (
  <motion.div
    className="max-w-7xl mx-auto px-4 sm:px-6 py-12"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.6 }}
  >
    <h2 className="text-3xl sm:text-5xl font-extrabold text-center text-green-700 mb-12">
      🌿 My Farm Products 🌿
    </h2>

    {/* Filters */}
    <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6  p-4 rounded-lg shadow">
      <input
        type="text"
        placeholder="🔍 Search by name"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border px-4 py-2 rounded-lg shadow-sm w-full md:w-1/3 focus:ring-2 focus:ring-green-500"
      />
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="border px-4 py-2 rounded-lg shadow-sm w-full md:w-1/3 focus:ring-2 focus:ring-green-500"
      >
        <option value="">🌐 All Categories</option>
        {uniqueCategories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>
      <button
        onClick={handleReset}
        className="flex items-center gap-2 border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white px-4 py-2 rounded-lg shadow-sm transition-colors"
      >
        <RotateCcw size={16} /> Reset
      </button>
    </div>

    {/* No products message */}
    {filtered.length === 0 ? (
      <p className="text-center text-gray-400 text-lg">
        No products match your filter.
      </p>
    ) : (
      <>
        {/* Scrollable table for mobile */}
        <div className="overflow-x-auto">
          <motion.table
            className="min-w-full bg-white rounded-xl shadow-md border border-green-300"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <thead className="bg-green-100 text-green-800 text-xs sm:text-sm">
              <tr>
                <th className="px-4 sm:px-6 py-3 sm:py-4 text-left font-semibold border-r border-green-300">Image</th>
                <th className="px-4 sm:px-6 py-3 text-left font-semibold border-r border-green-300">Name</th>
                <th className="px-4 sm:px-6 py-3 text-left font-semibold border-r border-green-300">Category</th>
                <th className="px-4 sm:px-6 py-3 text-left font-semibold border-r border-green-300">Price</th>
                <th className="px-4 sm:px-6 py-3 text-left font-semibold border-r border-green-300">Rating</th>
                <th className="px-4 sm:px-6 py-3 text-left font-semibold border-r border-green-300">Quantity</th>
                <th className="px-4 sm:px-6 py-3 text-left font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((product, idx) => (
                <motion.tr
                  key={product._id}
                  className="border-t border-green-200 hover:bg-green-50 transition"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                >
                  <td className="px-4 sm:px-6 py-3 border-r border-green-200">
                    <img
                      src={product.imageUrl || "https://via.placeholder.com/60"}
                      alt={product.name}
                      className="w-12 h-12 sm:w-16 sm:h-16 object-cover rounded-lg"
                    />
                  </td>
                  <td className="px-4 sm:px-6 py-3 font-medium text-gray-800 border-r border-green-200">{product.name}</td>
                  <td className="px-4 sm:px-6 py-3 text-sm border-r border-green-200">{product.category}</td>
                  <td className="px-4 sm:px-6 py-3 text-sm border-r border-green-200">₹{product.price}</td>
                  <td className="px-4 sm:px-6 py-3 text-sm border-r border-green-200">{renderStars(product.rating || 0)}</td>
                  <td className="px-4 sm:px-6 py-3 text-sm border-r border-green-200">{product.quantity}</td>
                  <td className="px-4 sm:px-6 py-3 flex gap-3 sm:gap-4">
                    <button
                      onClick={() => handleEdit(product)}
                      className="text-blue-600 hover:text-blue-800 mt-5"
                    >
                      <Pencil size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(product._id)}
                      className="text-red-600 hover:text-red-800 mt-5"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </motion.table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-6 gap-2 flex-wrap">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-4 py-2 rounded-lg shadow text-sm font-semibold ${
                  currentPage === i + 1
                    ? "bg-green-600 text-white"
                    : "bg-green-100 text-green-800 hover:bg-green-200"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        )}
      </>
    )}
  </motion.div>
);

};

export default MyProducts;
