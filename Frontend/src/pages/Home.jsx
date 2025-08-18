// File: src/pages/Home.jsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import banner1 from '../assets/banner1.png';
import banner2 from '../assets/banner2.png';
import banner3 from '../assets/banner3.png';
import banner4 from '../assets/banner4.png';
import { RotateCcw } from 'lucide-react';
import { AiFillStar, AiOutlineHeart, AiFillHeart, AiOutlineShoppingCart } from 'react-icons/ai';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-hot-toast';

const bannerImages = [banner1, banner2, banner3, banner4];

const Home = () => {
  const { token } = useAuth();
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [category, setCategory] = useState('');
  const [search, setSearch] = useState('');
  const [wishlistIds, setWishlistIds] = useState([]);
  const [cartIds, setCartIds] = useState([]);
  const [sort, setSort] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 16;

  const user = JSON.parse(localStorage.getItem('user'));

  // fetch all products
  useEffect(() => {
    const fetchAll = async () => {
      const res = await axios.get('http://localhost:5000/api/products');
      setProducts(res.data);
      setFiltered(res.data);
    };
    fetchAll();
  }, []);

  // fetch wishlist & cart only if role is "customer"
  useEffect(() => {
    if (!token || user?.role !== 'customer') return;

    axios
      .get('http://localhost:5000/api/wishlist', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        if (res.data && res.data.products) {
          setWishlistIds(res.data.products.map((p) => p._id));
        }
      })
      .catch((err) => console.error('Wishlist fetch error:', err));

    axios
      .get('http://localhost:5000/api/cart', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        if (res.data && res.data.items) {
          setCartIds(res.data.items.map((item) => item.productId._id));
        }
      })
      .catch((err) => console.error('Cart fetch error:', err));
  }, [token, user]);

  // filtering & sorting
  useEffect(() => {
    let temp = [...products];
    if (category) {
      temp = temp.filter(
        (p) => p.category?.toLowerCase() === category.toLowerCase()
      );
    }
    if (search) {
      temp = temp.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (sort === 'price-low') {
      temp.sort((a, b) => a.price - b.price);
    } else if (sort === 'price-high') {
      temp.sort((a, b) => b.price - a.price);
    } else if (sort === 'rating') {
      temp.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    }
    setFiltered(temp);
    setCurrentPage(1);
  }, [category, search, sort, products]);

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const currentItems = filtered.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const uniqueCategories = [...new Set(products.map((p) => p.category))];

  const handleReset = () => {
    setCategory('');
    setSearch('');
    setSort('');
  };

  const renderStars = (rating) =>
    Array.from({ length: 5 }, (_, i) => (
      <AiFillStar
        key={i}
        className={i < rating ? 'text-yellow-400' : 'text-gray-300'}
      />
    ));

  const isExpired = (expiryDate) => new Date(expiryDate) < new Date();

  const toggleWishlist = async (id) => {
    if (!token) {
      toast.error('Please log in to use wishlist');
      return;
    }
    if (user?.role !== 'customer') {
      toast.error('Only customers can use wishlist');
      return;
    }

    const exists = wishlistIds.includes(id);
    try {
      await axios.post(
        `http://localhost:5000/api/wishlist/${exists ? 'remove' : 'add'}`,
        { productId: id },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setWishlistIds((prev) =>
        exists ? prev.filter((pid) => pid !== id) : [...prev, id]
      );
    } catch (err) {
      console.error('Wishlist error:', err);
    }
  };

  const toggleCart = async (id, quantity = null) => {
    if (!token) {
      toast.error('Please log in to add to cart');
      return;
    }
    if (user?.role !== 'customer') {
      toast.error('Only customers can add to cart');
      return;
    }

    const exists = cartIds.includes(id);
    if (!quantity) {
      const qtyInput = document.getElementById(`qty-${id}`);
      quantity = qtyInput ? parseInt(qtyInput.value, 10) || 1 : 1;
    }
    try {
      await axios.post(
        `http://localhost:5000/api/cart/${exists ? 'remove' : 'add'}`,
        { productId: id, quantity },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setCartIds((prev) =>
        exists ? prev.filter((pid) => pid !== id) : [...prev, id]
      );
      toast.success(exists ? 'Removed from cart' : 'Added to cart');
    } catch (err) {
      console.error('Cart error:', err);
    }
  };

  return (
    <div className="bg-gradient-to-r from-green-100 to-lime-200 min-h-screen">
      {/* carousel */}
      <div className="mt-4 mx-auto max-w-6xl">
        <Carousel
          autoPlay
          infiniteLoop
          showThumbs={false}
          showStatus={false}
          interval={3000}
          swipeable
          emulateTouch
          stopOnHover={false}
          className="rounded-2xl shadow-md "
        >
          {bannerImages.map((src, idx) => (
            <div key={idx} className="relative">
              <img
                src={src}
                alt={`Banner ${idx + 1}`}
                className="h-72 w-full object-cover"
              />
              {/* Centered advertisement text */}
              <div className="absolute inset-0 flex items-center justify-center">
                <h2
                  className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white
                       text-center font-extrabold drop-shadow-lg font-serif
                       text-2xl sm:text-3xl md:text-5xl tracking-wide
                       animate-fadeIn"
                >
                  {idx === 0 &&
                    'FarmFresh — Freshness Delivered to Your Doorstep'}
                  {idx === 1 && 'Organic Goodness from Farm to Home'}
                  {idx === 2 && 'Eat Fresh, Live Healthy with FarmFresh'}
                  {idx === 3 && 'Supporting Farmers, Nourishing Families'}
                </h2>
              </div>
            </div>
          ))}
        </Carousel>
      </div>

      {/* search/filter */}
      <div className="flex flex-wrap justify-center items-center gap-4 mt-8 mb-6 px-4">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search product"
          className="border border-green-500 px-4 py-2 rounded-lg shadow w-60"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border border-green-500 px-4 py-2 rounded-lg shadow w-60"
        >
          <option value="">All Categories</option>
          {uniqueCategories.map((cat, i) => (
            <option key={i} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="border border-green-500 px-4 py-2 rounded-lg shadow w-60"
        >
          <option value="">Sort</option>
          <option value="price-low">Price Low to High</option>
          <option value="price-high">Price High to Low</option>
          <option value="rating">Rating</option>
        </select>
        <button
          onClick={handleReset}
          className="flex items-center gap-2 bg-blue-100 text-blue-600 hover:bg-blue-500 hover:text-white px-4 py-2 rounded-lg shadow"
        >
          <RotateCcw size={16} /> Reset
        </button>
      </div>

      {/* product grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto mt-4 px-4 pb-10">
        {currentItems.map((product, idx) => {
          const discount = Math.floor(product.price * 0.1);
          const discountedPrice = product.price - discount;
          return (
            <motion.div
              key={product._id}
              className="border rounded-xl shadow-md bg-white p-4 flex flex-col items-center hover:shadow-lg transition-transform duration-300 relative"
              whileHover={{ scale: 1.03 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
            >
              <button
                onClick={() => toggleWishlist(product._id)}
                className="absolute top-3 right-3 text-red-600 text-xl"
              >
                {wishlistIds.includes(product._id) ? (
                  <AiFillHeart />
                ) : (
                  <AiOutlineHeart />
                )}
              </button>
              <Link to={`/products/${product._id}`} className="w-full">
                <img
                  src={product.imageUrl || 'https://via.placeholder.com/150'}
                  alt={product.name}
                  className="w-full h-40 object-cover rounded mb-2"
                />
                <h2 className="font-semibold text-gray-800 mb-1 text-center text-3xl">
                  {product.name}
                </h2>
                <div className="text-center mb-1 text-green-700 font-bold text-2xl">
                  ₹{discountedPrice}
                  <span className="line-through text-red-400 text-sm ml-2">
                    ₹{product.price}
                  </span>
                </div>
                <div className="text-sm text-green-600 text-center mb-1 font-bold">
                  Save ₹{discount}
                </div>
                <div className="flex items-center gap-1 mb-2 justify-center">
                  {renderStars(product.rating || 0)}
                </div>
                {product.expiryDate && isExpired(product.expiryDate) && (
                  <span className="text-xs text-red-700 font-semibold block text-center bg-red-300 rounded-2xl w-16 ml-21">
                    Expired
                  </span>
                )}
              </Link>
              <div className="flex flex-col items-center mt-2">
                <div className="flex gap-2 items-center">
                  <label
                    htmlFor={`qty-${product._id}`}
                    className="text-sm text-gray-700 font-semibold"
                  >
                    Qty:
                  </label>
                  <input
                    id={`qty-${product._id}`}
                    type="number"
                    min="1"
                    defaultValue="1"
                    className="w-16 border rounded px-2 py-1 text-sm"
                  />
                </div>
                <button
                  onClick={() => toggleCart(product._id)}
                  className="mt-2 px-3 py-1 flex items-center gap-1 bg-green-600 text-white rounded font-semibold hover:bg-green-700 transition text-sm"
                >
                  <AiOutlineShoppingCart />{' '}
                  {cartIds.includes(product._id)
                    ? 'Remove from Cart'
                    : 'Add to Cart'}
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-6 gap-3">
          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-green-200 text-green-700 rounded hover:bg-green-300"
          >
            ◀
          </button>
          <span className="px-4 py-2 text-green-900 font-semibold">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-green-200 text-green-700 rounded hover:bg-green-300"
          >
            ▶
          </button>
        </div>
      )}
    </div>
  );
};

export default Home;
