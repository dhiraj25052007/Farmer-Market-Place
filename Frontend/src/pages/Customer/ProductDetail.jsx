// File: src/pages/ProductDetail.jsx

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { AiFillStar, AiOutlineShoppingCart, AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { useAuth } from '../../context/AuthContext';
import OrderOptions from '../Customer/OrderOption';
import { toast } from 'react-hot-toast';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token } = useAuth();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [cartIds, setCartIds] = useState([]);
  const [wishlistIds, setWishlistIds] = useState([]);
  const [showOrder, setShowOrder] = useState(false);
  const [recommended, setRecommended] = useState([]);
  const user = JSON.parse(localStorage.getItem('user'));

  // Fetch product details
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/products/${id}`);
        setProduct(res.data);
      } catch {
        setError('Product not found');
      }
    };
    fetchProduct();
  }, [id]);

  // Fetch cart + wishlist only if customer
  useEffect(() => {
    if (!token || user?.role !== 'customer') return;

    axios
      .get('http://localhost:5000/api/cart', {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      })
      .then((res) => setCartIds(res.data.items.map((item) => item.productId._id)))
      .catch(() => setCartIds([]));

    axios
      .get('http://localhost:5000/api/wishlist', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setWishlistIds(res.data.products.map((p) => p._id)))
      .catch(() => setWishlistIds([]));
  }, [token, user]);

  // Fetch recommended products
  useEffect(() => {
    if (!product?.category) return;
    const fetchRecommended = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/products`);
        const filtered = res.data.filter(
          (p) => p.category === product.category && p._id !== product._id
        );
        setRecommended(filtered);
      } catch (err) {
        console.error('Recommended fetch failed:', err);
      }
    };
    fetchRecommended();
  }, [product]);

  // Render stars
  const renderStars = (rating) =>
    Array.from({ length: 5 }, (_, i) => (
      <AiFillStar key={i} className={i < rating ? 'text-yellow-400' : 'text-gray-300'} />
    ));

  const isExpired = (expiryDate) => new Date(expiryDate) < new Date();

  // Toggle cart
  const toggleCart = async () => {
    if (!token) {
      toast.error('Please log in to add to cart');
      return;
    }
    if (user?.role !== 'customer') {
      toast.error('Only customers can purchase');
      return;
    }
    const exists = cartIds.includes(product._id);
    try {
      await axios.post(
        `http://localhost:5000/api/cart/${exists ? 'remove' : 'add'}`,
        { productId: product._id, quantity },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setCartIds((prev) =>
        exists ? prev.filter((pid) => pid !== product._id) : [...prev, product._id]
      );
      toast.success(exists ? 'Removed from cart' : 'Added to cart');
    } catch {
      toast.error('Cart operation failed');
    }
  };

  // Toggle wishlist
  const toggleWishlist = async () => {
    if (!token) {
      toast.error('Please log in to use wishlist');
      return;
    }
    if (user?.role !== 'customer') {
      toast.error('Only customers can use wishlist');
      return;
    }
    const exists = wishlistIds.includes(product._id);
    try {
      await axios.post(
        `http://localhost:5000/api/wishlist/${exists ? 'remove' : 'add'}`,
        { productId: product._id },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setWishlistIds((prev) =>
        exists ? prev.filter((pid) => pid !== product._id) : [...prev, product._id]
      );
      toast.success(exists ? 'Removed from wishlist' : 'Added to wishlist');
    } catch {
      toast.error('Wishlist operation failed');
    }
  };

  if (error) return <p className="text-center mt-10 text-red-600">{error}</p>;
  if (!product) return <p className="text-center mt-10 text-gray-600">Loading...</p>;

  const discount = Math.floor(product.price * 0.1);
  const discountedPrice = product.price - discount;

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-r from-green-100 to-lime-200 py-10 px-4 md:px-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-lg p-6 grid md:grid-cols-2 gap-6">
        <div className="relative">
          <img
            src={product.imageUrl || 'https://via.placeholder.com/400'}
            alt={product.name}
            className="rounded-xl w-full h-80 object-cover"
          />
          <button
            onClick={toggleWishlist}
            className="absolute top-4 right-4 text-red-500 text-2xl"
          >
            {wishlistIds.includes(product._id) ? <AiFillHeart /> : <AiOutlineHeart />}
          </button>
        </div>

        <div>
          <h2 className="text-3xl font-bold text-green-800 mb-2">{product.name}</h2>
          <p className="text-lg text-gray-700 mb-1 font-semibold">
            Category: {product.category}
          </p>
          <div className="mb-2">
            <span className="inline-block bg-yellow-300 text-yellow-900 px-3 py-1 text-xs rounded-full mb-1 font-semibold">
              Limited Time Offer ,Get Delivery In 20 Minutes With Discounts !!!
            </span>

            <p className="text-sm line-through text-red-400 font-semibold">
              Original: ₹{product.price}
            </p>
            <p className="text-lg text-green-700 font-bold">
              Now: ₹{discountedPrice}{' '}
              <span className="text-sm text-green-600 font-bold">(Save ₹{discount})</span>
            </p>
          </div>
          <p className="text-sm text-gray-600 mb-4">{product.description}</p>

          <div className="flex gap-2 items-center mb-2">
            <span className="font-medium">Rating:</span>
            {renderStars(product.rating || 0)}
          </div>

          {product.expiryDate && isExpired(product.expiryDate) && (
            <span className="inline-block bg-red-300 text-red-700 px-3 py-1 text-xs font-semibold rounded-full">
              Expired
            </span>
          )}

          <div className="mt-6 flex flex-wrap items-center gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Quantity:</label>
              <input
                type="number"
                value={quantity}
                onChange={(e) =>
                  setQuantity(Math.max(1, parseInt(e.target.value, 10) || 1))
                }
                min={1}
                className="border px-3 py-2 rounded w-24"
              />
            </div>

            <motion.button
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.05 }}
              onClick={toggleCart}
              className="bg-green-600 text-white px-5 py-2 mt-5 md:mt-8 rounded-lg hover:bg-green-700 transition flex items-center gap-2 shadow-md"
            >
              <AiOutlineShoppingCart className="text-lg" />
              {cartIds.includes(product._id) ? 'Remove from Cart' : 'Add to Cart'}
            </motion.button>

            <motion.button
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.05 }}
              onClick={() => {
                if (!token) {
                  toast.error('Please log in to purchase');
                  return;
                }
                if (user?.role !== 'customer') {
                  toast.error('Only customers can purchase');
                  return;
                }
                setShowOrder(true);
              }}
              className="bg-blue-600 text-white px-5 py-2 mt-5 md:mt-8 rounded-lg hover:bg-blue-700 transition shadow-md"
            >
              Buy Now
            </motion.button>
          </div>

          {showOrder && (
            <div className="mt-6">
              <OrderOptions
                items={[{ productId: product, quantity, price: discountedPrice }]}
                total={discountedPrice * quantity}
              />
            </div>
          )}
        </div>
      </div>

      {recommended.length > 0 && (
        <div className="max-w-5xl mx-auto mt-10">
          <h3 className="text-3xl font-bold text-green-800 mb-4">🛒 Recommended Products</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {recommended.map((item, idx) => {
              const discount = Math.floor(item.price * 0.1);
              const discountedPrice = item.price - discount;

              return (
                <motion.div
                  key={item._id}
                  whileHover={{ scale: 1.03 }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-white shadow-md p-4 rounded-xl border hover:shadow-lg transition"
                >
                  <img
                    src={item.imageUrl || 'https://via.placeholder.com/200'}
                    alt={item.name}
                    className="w-full h-40 object-cover rounded"
                  />
                  <h4 className="text-lg font-semibold mt-2 text-gray-800">{item.name}</h4>
                  <span className="inline-block bg-yellow-200 text-yellow-800 text-xs font-medium px-2 py-1 rounded-full mt-1">
                    Offer
                  </span>
                  <p className="text-sm line-through text-gray-600 mt-1 font-semibold">
                    ₹{item.price}
                  </p>
                  <p className="text-green-700 font-bold text-md text-2xl">
                    Now ₹{discountedPrice}
                  </p>
                  <div className="mt-2 flex items-center gap-1">
                    {renderStars(item.rating || 0)}
                  </div>
                  <button
                    onClick={() => navigate(`/products/${item._id}`)}
                    className="mt-3 bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                  >
                    View Product
                  </button>
                </motion.div>
              );
            })}
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default ProductDetail;
