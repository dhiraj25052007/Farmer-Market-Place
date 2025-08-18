import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const AddProduct = () => {
  const { token, user } = useAuth();
  const navigate = useNavigate();

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

  const [preview, setPreview] = useState('');
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    if (e.target.name === 'imageUrl') {
      setPreview(e.target.value);
    }
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    setLoading(true);

    try {
      const res = await axios.post(
        'http://localhost:5000/api/products',
        { ...formData },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      setMessage('Product added successfully!');
      setLoading(false);
      toast.success("Product added successfully!")
      setTimeout(() => navigate('/farmer/dashboard1/my-products'), 1500);
    } catch (err) {
      setLoading(false);
      setMessage(err.response?.data?.error || 'Something went wrong!');
    }
  };

  return (
    <div className=''>
    <motion.div
      className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-lg border "
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-3xl font-bold text-green-700 mb-6 text-center">Add New Product</h2>
      {message && (
        <div className={`mb-4 text-center text-${message.includes('successfully') ? 'green' : 'red'}-600`}>
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input type="text" name="name" placeholder="Product Name" onChange={handleChange} required className="border px-4 py-2 rounded w-full" />
          <input type="number" name="price" placeholder="Price" onChange={handleChange} required className="border px-4 py-2 rounded w-full" />
          <input type="text" name="category" placeholder="Category" onChange={handleChange} required className="border px-4 py-2 rounded w-full" />
          <input type="number" name="quantity" placeholder="Quantity" onChange={handleChange} required className="border px-4 py-2 rounded w-full" />
          <input type="date" name="expiryDate" onChange={handleChange} required className="border px-4 py-2 rounded w-full" />
          <input type="number" name="rating" placeholder="Rating (1-5)" onChange={handleChange} min="1" max="5" className="border px-4 py-2 rounded w-full" />
        </div>

        <textarea
          name="description"
          placeholder="Description"
          onChange={handleChange}
          required
          className="border px-4 py-2 rounded w-full"
        />

        <input
          type="text"
          name="imageUrl"
          placeholder="Image URL"
          onChange={handleChange}
          className="border px-4 py-2 rounded w-full"
        />

        {preview && (
          <motion.img
            src={preview}
            alt="Preview"
            className="w-40 h-40 object-cover mx-auto mt-4 rounded-lg shadow-md"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          />
        )}

        <button
          type="submit"
          disabled={loading}
          className={`w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded transition-all ${
            loading && 'opacity-50 cursor-not-allowed'
          }`}
        >
          {loading ? 'Adding...' : 'Add Product'}
        </button>
      </form>
    </motion.div>
    </div>
  );
};

export default AddProduct;
