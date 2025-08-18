import React from "react";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaFacebookF,
  FaInstagram,
  FaTwitter,
} from "react-icons/fa";

const Contact = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-green-100 to-lime-200 py-16 px-6 lg:px-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">

        {/* Left: Contact Info */}
        <div className="space-y-6 animate-fade-in-up">
          <h2 className="text-4xl font-extrabold text-green-800">Contact Us</h2>
          <p className="text-gray-700 text-lg">
            Have a question about our organic products or want to visit our farm? We’d love to hear from you.
          </p>

          <div className="space-y-4 text-green-800 text-md">
            <div className="flex items-center gap-3">
              <FaPhoneAlt className="text-lg" />
              <span>+91 98765 43210</span>
            </div>
            <div className="flex items-center gap-3">
              <FaEnvelope className="text-lg" />
              <a href="mailto:info@farmfresh.com" className="hover:underline">
                info@farmfresh.com
              </a>
            </div>
            <div className="flex items-center gap-3">
              <FaMapMarkerAlt className="text-lg" />
              <span>Plot 27, Organic Farm Street, Pune, Maharashtra, India</span>
            </div>
          </div>

          <div className="flex gap-4 mt-6 text-green-800">
            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-blue-600 transition">
              <FaFacebookF size={22} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-pink-500 transition">
              <FaInstagram size={22} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-blue-400 transition">
              <FaTwitter size={22} />
            </a>
          </div>
        </div>

        {/* Right: Form */}
        <div className="bg-white shadow-2xl rounded-3xl p-10 space-y-6 transition hover:shadow-green-200 animate-fade-in-down">
          <h3 className="text-3xl font-bold text-green-700">Send a Message</h3>
          <form className="space-y-5">
            <div>
              <label className="block mb-1 text-gray-600 font-medium">Name</label>
              <input
                type="text"
                placeholder="Your Name"
                className="w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-green-400 focus:outline-none"
              />
            </div>
            <div>
              <label className="block mb-1 text-gray-600 font-medium">Email</label>
              <input
                type="email"
                placeholder="your@email.com"
                className="w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-green-400 focus:outline-none"
              />
            </div>
            <div>
              <label className="block mb-1 text-gray-600 font-medium">Message</label>
              <textarea
                rows="4"
                placeholder="Write your message..."
                className="w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-green-400 focus:outline-none"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-lg transition"
            >
              Submit
            </button>
          </form>
        </div>
      </div>

      {/* Map Section */}
      <div className="mt-20">
        <h3 className="text-2xl font-bold text-green-800 mb-4">Visit Us</h3>
        <iframe
          title="Farm Location in Pune"
          className="w-full h-72 rounded-xl border-4 border-green-200 shadow-lg"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3782.2362738814727!2d73.8567434147304!3d18.52043028740001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2c07e5ed25081%3A0x8d1e60c4959396!2sPune%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1689342501741"
          allowFullScreen
          loading="lazy"
        ></iframe>
      </div>
    </div>
  );
};

export default Contact;