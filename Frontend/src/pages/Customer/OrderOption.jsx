import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { motion } from 'framer-motion';
import React from 'react';
import { User, Mail, Phone, MapPin } from "lucide-react"; // ✅ Icons

const OrderOptions = ({ items, total, productId, quantity }) => {
  const { token } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [method, setMethod] = useState('cod'); 

  const user = JSON.parse(localStorage.getItem('user'));
  const customerId = user?.id||user._id;

  // Calculate charges
  const shipping = parseFloat((total * 0.10).toFixed(2));
  const gst = parseFloat((total * 0.08).toFixed(2));
  const finalTotal = parseFloat((total + shipping + gst).toFixed(2));

  const handleOrder = async () => {
    if (!address.trim() || !name.trim() || !email.trim() || !phone.trim()) {
      return toast.error("All fields required");
    }

    const payload = productId
      ? {
          customerId,
          name,
          email,
          phone,
          items: [{ productId, quantity, price: total }],
          total: finalTotal,
          address,
        }
      : {
          customerId,
          name,
          email,
          phone,
          items: items.map((i) => ({
            productId: i.productId._id,
            quantity: i.quantity,
            price: i.productId.price,
          })),
          total: finalTotal,
          address,
        };

    try {
      await axios.post('https://farmer-market-place-c2wq.onrender.com/api/orders', payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success('Order placed successfully: Thanks', { duration: 1000 });
      setTimeout(() => {
        navigate("/customer/dashboard1");
      }, 2000);
    } catch (err) {
      toast.error(err.response?.data?.error || 'Order failed');
    }
  };

  return (
    <>
      <motion.div
        className="mt-6 space-y-6 border border-green-500 rounded-2xl p-6 shadow-md bg-white"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h3 className="text-2xl font-bold text-green-800">Choose Payment Method</h3>

        {/* Payment Options */}
        <div className="flex flex-wrap gap-6">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="radio"
              value="cod"
              checked={method === 'cod'}
              onChange={() => setMethod('cod')}
              className="accent-green-600"
            />
            <span className="text-lg font-medium text-gray-800">Cash on Delivery</span>
          </label>

          <label className="flex items-center gap-3 cursor-not-allowed">
            <input
              type="radio"
              value="razorpay"
              disabled
              onChange={() => setMethod('razorpay')}
              className="accent-gray-400"
            />
            <span className="text-lg text-gray-400">Razorpay (Coming Soon)</span>
          </label>
        </div>

        {/* Static Inputs */}
        <div className="space-y-3">
          <div className="flex items-center border px-3 py-2 rounded">
            <User className="text-green-600 mr-2" size={20} />
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Full Name"
              className="w-full outline-none"
            />
          </div>

          <div className="flex items-center border px-3 py-2 rounded">
            <Mail className="text-green-600 mr-2" size={20} />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full outline-none"
            />
          </div>

          <div className="flex items-center border px-3 py-2 rounded">
            <Phone className="text-green-600 mr-2" size={20} />
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Phone Number"
              className="w-full outline-none"
            />
          </div>
        </div>

        {/* Address */}
        <div className="flex items-start border px-3 py-2 rounded">
          <MapPin className="text-green-600 mr-2 mt-2" size={20} />
          <textarea
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            rows={3}
            className="w-full p-2 outline-none resize-none"
            placeholder="Enter delivery address"
          />
        </div>

        {/* Price Summary */}
        <div className="text-sm text-gray-700 space-y-1">
          <p className='font-semibold'>Subtotal: ₹{total}</p>
          <p className='font-semibold'>Shipping Charges (10%): ₹{shipping}</p>
          <p className='font-semibold'>GST (8%): ₹{gst}</p>
          <p className="font-bold text-lg text-green-800">Final Total: ₹{finalTotal}</p>
        </div>

        {/* Place Order Button */}
        <motion.button
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.05 }}
          onClick={handleOrder}
          className="w-full text-center bg-green-600 hover:bg-green-700 transition text-white px-6 py-3 rounded-lg text-lg font-semibold shadow-md"
        >
          Place Order
        </motion.button>
      </motion.div>
    </>
  );
};

export default OrderOptions;
