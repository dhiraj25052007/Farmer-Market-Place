// File: src/pages/EditProduct.jsx

import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

const EditProduct = () => {
  const { state } = useLocation();
  const { token } = useAuth();
  const navigate = useNavigate();
  const product = state?.product;

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    quantity: '',
    expiryDate: '',
    rating: '',
    imageUrl: ''
  });

  useEffect(() => {
    if (product) setFormData(product);
  }, [product]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/products/${product._id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      toast.success("Updated Successfully !!")
       navigate('/farmer/dashboard1/my-products');
    } catch (err) {
      alert('Failed to update product');
    }
  };

  return (
    <motion.div
      className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-lg border"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-3xl font-bold text-blue-700 mb-6 text-center">Edit Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input type="text" name="name" value={formData.name} onChange={handleChange} required placeholder="Product Name" className="border px-4 py-2 rounded w-full" />
          <input type="number" name="price" value={formData.price} onChange={handleChange} required placeholder="Price" className="border px-4 py-2 rounded w-full" />
          <input type="text" name="category" value={formData.category} onChange={handleChange} required placeholder="Category" className="border px-4 py-2 rounded w-full" />
          <input type="number" name="quantity" value={formData.quantity} onChange={handleChange} required placeholder="Quantity" className="border px-4 py-2 rounded w-full" />
          <input type="date" name="expiryDate" value={formData.expiryDate?.slice(0,10)} onChange={handleChange} required className="border px-4 py-2 rounded w-full" />
          <input type="number" name="rating" value={formData.rating} onChange={handleChange} min="1" max="5" placeholder="Rating" className="border px-4 py-2 rounded w-full" />
        </div>
        <textarea name="description" value={formData.description} onChange={handleChange} required placeholder="Description" className="border px-4 py-2 rounded w-full" />
        <input type="text" name="imageUrl" value={formData.imageUrl} onChange={handleChange} placeholder="Image URL" className="border px-4 py-2 rounded w-full" />

        <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded transition-all">
          Update Product
        </button>
      </form>
    </motion.div>
  );
};

export default EditProduct;
