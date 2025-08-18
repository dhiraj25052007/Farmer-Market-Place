// File: src/pages/Reviews.jsx
import React from "react";
import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const reviews = [
  {
    id: 1,
    name: "Aarav Sharma",
    role: "Farmer",
    review:
      "This platform made it so easy for me to sell my produce directly to customers. The interface is smooth and very easy to use.",
    rating: 5,
  },
  {
    id: 2,
    name: "Priya Patel",
    role: "Customer",
    review:
      "Loved the fresh vegetables I ordered! The delivery was on time, and the quality was better than local stores.",
    rating: 4,
  },
  {
    id: 3,
    name: "Rohan Mehta",
    role: "Customer",
    review:
      "The wishlist feature is amazing! I can save my favorite products and order them later. Really smooth experience.",
    rating: 5,
  },
  {
    id: 4,
    name: "Sunita Verma",
    role: "Farmer",
    review:
      "Finally a platform where farmers get fair prices without middlemen. Payments are secure and quick!",
    rating: 5,
  },
  {
    id: 5,
    name: "Aditya Kulkarni",
    role: "Customer",
    review:
      "Very easy to navigate and checkout. I was able to place my order in just a few minutes. Highly recommend!",
    rating: 4,
  },
  {
    id: 6,
    name: "Meena Joshi",
    role: "Customer",
    review:
      "The subscription option for weekly fresh fruits is just what I needed. Saves me a lot of time.",
    rating: 5,
  },
];

const getInitials = (name) =>
  name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

const avatarColors = [
  "bg-green-500",
  "bg-lime-500",
  "bg-teal-500",
  "bg-emerald-500",
  "bg-cyan-500",
  "bg-orange-500",
];

const Reviews = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 to-lime-200 py-12 px-6">
      {/* Heading */}
      <motion.h1
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl md:text-5xl font-extrabold text-center text-green-800 mb-12"
      >
        What People Say <span className="text-lime-600">About Us</span>
      </motion.h1>

      {/* Reviews Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {reviews.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2, duration: 0.6 }}
            className="bg-white shadow-lg rounded-2xl p-6 hover:shadow-2xl transition-all duration-300 relative"
          >
            <Quote className="absolute top-4 right-4 text-lime-400 w-8 h-8" />

            <div className="flex items-center gap-4 mb-4">
              {/* Avatar with initials */}
              <div
                className={`w-16 h-16 flex items-center justify-center rounded-full text-white font-bold text-xl shadow ${
                  avatarColors[index % avatarColors.length]
                }`}
              >
                {getInitials(item.name)}
              </div>
              <div>
                <h2 className="text-xl font-bold text-green-800">{item.name}</h2>
                <p className="text-sm text-gray-500">{item.role}</p>
              </div>
            </div>

            <p className="text-gray-700 mb-4 italic">"{item.review}"</p>

            {/* Rating */}
            <div className="flex">
              {Array.from({ length: item.rating }).map((_, i) => (
                <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
              ))}
              {Array.from({ length: 5 - item.rating }).map((_, i) => (
                <Star key={i} className="w-5 h-5 text-gray-300" />
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Reviews;
