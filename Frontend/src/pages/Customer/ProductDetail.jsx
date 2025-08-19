// File: src/pages/ProductDetail.jsx

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import {
  AiFillStar,
  AiOutlineShoppingCart,
  AiOutlineHeart,
  AiFillHeart,
} from "react-icons/ai";
import { useAuth } from "../../context/AuthContext";
import OrderOptions from "../Customer/OrderOption";
import { toast } from "react-hot-toast";

// Helper: random reviewer names
const randomNames = ["Rahul S.", "Priya M.", "Ankit K.", "Sneha R.", "Amit P."];

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
  const [showReviews, setShowReviews] = useState(false);
  const [reviews, setReviews] = useState([]); // ✅ now stored in state
  const user = JSON.parse(localStorage.getItem("user"));

  // Fetch product details
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/products/${id}`);
        setProduct(res.data);
      } catch {
        setError("Product not found");
      }
    };
    fetchProduct();
  }, [id]);

  // Generate dummy reviews once when product loads
  useEffect(() => {
    if (product) {
      const generatedReviews = [
        {
          id: 1,
          name: randomNames[Math.floor(Math.random() * randomNames.length)],
          text: `I really liked the ${product.name}. Quality is excellent and delivery was quick!`,
          rating: 5,
        },
        {
          id: 2,
          name: randomNames[Math.floor(Math.random() * randomNames.length)],
          text: `The ${product.name} is worth the price. Fresh and nicely packed.`,
          rating: 4,
        },
      ];
      setReviews(generatedReviews);
    }
  }, [product]);

  // Fetch cart + wishlist
  useEffect(() => {
    if (!token || user?.role !== "customer") return;

    axios
      .get("http://localhost:5000/api/cart", {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      })
      .then((res) =>
        setCartIds(res.data.items.map((item) => item.productId._id))
      )
      .catch(() => setCartIds([]));

    axios
      .get("http://localhost:5000/api/wishlist", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setWishlistIds(res.data.products.map((p) => p._id)))
      .catch(() => setWishlistIds([]));
  }, [token, user]);

  // Fetch recommended
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
        console.error("Recommended fetch failed:", err);
      }
    };
    fetchRecommended();
  }, [product]);

  // Stars
  const renderStars = (rating) =>
    Array.from({ length: 5 }, (_, i) => (
      <AiFillStar
        key={i}
        className={i < rating ? "text-yellow-400" : "text-gray-300"}
      />
    ));

  const isExpired = (expiryDate) => new Date(expiryDate) < new Date();

  // Cart toggle
  const toggleCart = async () => {
    if (!token) return toast.error("Please log in to add to cart");
    if (user?.role !== "customer")
      return toast.error("Only customers can purchase");

    const exists = cartIds.includes(product._id);
    try {
      await axios.post(
        `http://localhost:5000/api/cart/${exists ? "remove" : "add"}`,
        { productId: product._id, quantity },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setCartIds((prev) =>
        exists
          ? prev.filter((pid) => pid !== product._id)
          : [...prev, product._id]
      );
      toast.success(exists ? "Removed from cart" : "Added to cart");
    } catch {
      toast.error("Cart operation failed");
    }
  };

  // Wishlist toggle
  const toggleWishlist = async () => {
    if (!token) return toast.error("Please log in to use wishlist");
    if (user?.role !== "customer")
      return toast.error("Only customers can use wishlist");

    const exists = wishlistIds.includes(product._id);
    try {
      await axios.post(
        `http://localhost:5000/api/wishlist/${exists ? "remove" : "add"}`,
        { productId: product._id },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setWishlistIds((prev) =>
        exists
          ? prev.filter((pid) => pid !== product._id)
          : [...prev, product._id]
      );
      toast.success(exists ? "Removed from wishlist" : "Added to wishlist");
    } catch {
      toast.error("Wishlist operation failed");
    }
  };

  if (error)
    return <p className="text-center mt-10 text-red-600">{error}</p>;
  if (!product)
    return (
      <p className="text-center mt-10 text-gray-600">Loading...</p>
    );

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
        {/* Left: Image */}
        <div className="relative">
          <img
            src={product.imageUrl || "https://via.placeholder.com/400"}
            alt={product.name}
            className="rounded-xl w-full h-80 object-cover"
          />
          <button
            onClick={toggleWishlist}
            className="absolute top-4 right-4 text-red-500 text-2xl"
          >
            {wishlistIds.includes(product._id) ? (
              <AiFillHeart />
            ) : (
              <AiOutlineHeart />
            )}
          </button>
        </div>

        {/* Right: Info */}
        <div>
          <h2 className="text-3xl font-bold text-green-800 mb-2">
            {product.name}
          </h2>
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
              Now: ₹{discountedPrice}{" "}
              <span className="text-sm text-green-600 font-bold">
                (Save ₹{discount})
              </span>
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

          {/* Actions */}
          <div className="mt-6 flex flex-wrap items-center gap-4">
            {/* Quantity */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Quantity:
              </label>
              <input
                type="number"
                value={quantity}
                onChange={(e) =>
                  setQuantity(
                    Math.max(1, parseInt(e.target.value, 10) || 1)
                  )
                }
                min={1}
                className="border px-3 py-2 rounded w-24"
              />
            </div>

            {/* Add to Cart */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.05 }}
              onClick={toggleCart}
              className="bg-green-600 text-white px-3 py-2 mt-5 md:mt-8 rounded-lg hover:bg-green-700 transition flex items-center gap-2 shadow-md"
            >
              <AiOutlineShoppingCart className="text-lg" />
              {cartIds.includes(product._id)
                ? "Remove from Cart"
                : "Add to Cart"}
            </motion.button>

            {/* Buy Now */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.05 }}
              onClick={() => {
                if (!token) return toast.error("Please log in to purchase");
                if (user?.role !== "customer")
                  return toast.error("Only customers can purchase");
                setShowOrder(true);
              }}
              className="bg-blue-600 text-white px-5 py-2 mt-5 md:mt-8 rounded-lg hover:bg-blue-700 transition shadow-md"
            >
              Buy Now
            </motion.button>

            {/* Reviews Button */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.05 }}
              onClick={() => setShowReviews((prev) => !prev)}
              className="bg-rose-500 text-white px-5 py-2 mt-5 md:mt-8 rounded-lg hover:bg-rose-700 transition shadow-md"
            >
              {showReviews ? "Hide Reviews" : "Reviews"}
            </motion.button>
          </div>

          {/* Order Options */}
          {showOrder && (
            <div className="mt-6">
              <OrderOptions
                items={[
                  { productId: product, quantity, price: discountedPrice },
                ]}
                total={discountedPrice * quantity}
              />
            </div>
          )}

          {/* Reviews Section */}
          {showReviews && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="mt-6 space-y-4 bg-gray-50 p-4 rounded-lg shadow"
            >
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                Customer Reviews
              </h3>
              {reviews.map((review) => (
                <div
                  key={review.id}
                  className="p-3 bg-white rounded-lg shadow-sm border"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-semibold text-gray-900">
                      {review.name}
                    </span>
                    <div className="flex">{renderStars(review.rating)}</div>
                  </div>
                  <p className="text-sm text-gray-700">{review.text}</p>
                </div>
              ))}
            </motion.div>
          )}
        </div>
      </div>

      {/* Recommended Products */}
      {recommended.length > 0 && (
        <div className="max-w-5xl mx-auto mt-10">
          <h3 className="text-3xl font-bold text-green-800 mb-4">
            🛒 Recommended Products
          </h3>
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
                    src={item.imageUrl || "https://via.placeholder.com/200"}
                    alt={item.name}
                    className="w-full h-40 object-cover rounded"
                  />
                  <h4 className="text-lg font-semibold mt-2 text-gray-800">
                    {item.name}
                  </h4>
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
