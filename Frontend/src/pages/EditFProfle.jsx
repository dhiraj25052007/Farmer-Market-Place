// src/pages/EditProfile.jsx
import { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-hot-toast";
import React from "react";
import { User, Mail, Phone, Home } from "lucide-react"; // ✅ import icons

const EditFProfile = () => {
  const { user, token, login } = useAuth();
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    address: user?.address || "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        `https://farmer-market-place-c2wq.onrender.com/api/users/${user._id || user.id}`,
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success("Profile updated successfully!");
      login(token, res.data); // refresh user in context
    } catch (err) {
      console.error("Profile update error:", err);
      toast.error("Update failed");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold text-green-700 mb-6">Edit Profile</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        
        {/* Name */}
        <div className="flex items-center border px-3 py-2 rounded">
          <User className="text-green-600 mr-2" size={20} />
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Full Name"
            className="w-full outline-none"
          />
        </div>

        {/* Email */}
        <div className="flex items-center border px-3 py-2 rounded">
          <Mail className="text-green-600 mr-2" size={20} />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full outline-none"
          />
        </div>

        {/* Phone */}
        <div className="flex items-center border px-3 py-2 rounded">
          <Phone className="text-green-600 mr-2" size={20} />
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Phone"
            className="w-full outline-none"
          />
        </div>

        {/* Address */}
        <div className="flex items-center border px-3 py-2 rounded">
          <Home className="text-green-600 mr-2" size={20} />
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Address"
            className="w-full outline-none"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditFProfile;
