import React from 'react';
import farmteam from '../assets/farmteam.png'
import farmlandscape from '../assets/farmlandscape.png'
import farmproduce from '../assets/farmproduce.png'
import { Link } from 'react-router-dom';





const About = () => {
  return (
    <div className="bg-gradient-to-r from-green-100 to-lime-200 min-h-screen text-gray-800 py-16 px-6 md:px-20">
      
      {/* Hero */}
      <div className="text-center mb-20">
        <h1 className="text-5xl font-extrabold text-green-900 mb-4 tracking-tight drop-shadow-md hover:scale-105 transition-transform duration-300">
          Welcome to Farm Fresh 🌾
        </h1>
        <p className="max-w-3xl mx-auto text-lg text-gray-700 font-light">
          A place where passion meets the earth, and every seed is planted with purpose.
        </p>
      </div>

      {/* Glass Card Sections */}
      <div className="grid md:grid-cols-2 gap-12 mb-20">
        {/* Section 1 */}
        <div className="bg-white/70 backdrop-blur-lg rounded-xl shadow-xl p-8 hover:scale-105 transition duration-300 group">
          <h2 className="text-2xl font-bold text-green-800 mb-4 group-hover:text-green-600 transition">
            🌿 Who We Are
          </h2>
          <p>
            We're a family-led farm dedicated to cultivating the cleanest, most nutritious produce nature can provide.
            Generations of farmers have built this land into a haven for sustainable, organic agriculture.
          </p>
        </div>
        <img
          src={farmteam}
          alt="Farm team"
          className="rounded-xl shadow-lg hover:scale-105 transition-transform duration-300 w-2xl"
        />

        {/* Section 2 */}
        <img
          src={farmlandscape}
          alt="Farm landscape"
          className="rounded-xl shadow-lg hover:scale-105 transition-transform duration-300 w-2xl"
        />
        <div className="bg-white/70 backdrop-blur-lg rounded-xl shadow-xl p-8 hover:scale-105 transition duration-300 group">
          <h2 className="text-2xl font-bold text-green-800 mb-4 group-hover:text-green-600 transition">
            🚜 Our Mission
          </h2>
          <p>
            To nourish people and the planet through sustainable farming, soil regeneration, and community connection.
            We are stewards of the land, growing food the way nature intended — chemical-free and full of life.
          </p>
        </div>

        {/* Section 3 */}
        <div className="bg-white/70 backdrop-blur-lg rounded-xl shadow-xl p-8 hover:scale-105 transition duration-300 group">
          <h2 className="text-2xl font-bold text-green-800 mb-4 group-hover:text-green-600 transition">
            🍅 What We Grow
          </h2>
          <p>
            Vibrant vegetables, seasonal fruits, ethically raised livestock, and fresh herbs — all nurtured from seed to harvest
            with care and transparency.
          </p>
        </div>
        <img
          src={farmproduce}
          alt="Farm produce"
          className="rounded-xl shadow-lg hover:scale-105 transition-transform duration-300 w-2xl"
        />
      </div>

      {/* Stats Section */}
      <div className="mb-20 text-center">
        <h3 className="text-3xl font-bold text-green-700 mb-10">📈 Our Impact</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { value: "350+", label: "Acres Farmed" },
            { value: "1,000+", label: "Local Families Fed" },
            { value: "45+", label: "Varieties Grown" },
            { value: "25", label: "Years of Legacy" },
          ].map(({ value, label }, i) => (
            <div
              key={i}
              className="bg-white/60 backdrop-blur-xl p-6 rounded-lg shadow-md hover:bg-green-100 transition duration-300"
            >
              <h4 className="text-4xl font-extrabold text-green-800">{value}</h4>
              <p className="mt-2 text-gray-700">{label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Testimonials */}
      <div className="mb-24">
        <h2 className="text-3xl font-bold text-green-800 text-center mb-10">💬 What Our Customers Say</h2>
        <div className="grid md:grid-cols-2 gap-10">
          {[
            {
              name: "Anjali Sharma",
            
              text: "Buying from this farm changed the way I eat. Everything tastes fresh and healthy. The people are kind and transparent.",
            },
            {
              name: "Harish Mehta",
              text: "Their produce is top-quality, and I love knowing it’s grown ethically. Highly recommended!",
            },
              {
              name: "Sonu Bhide",
              text: "Their produce is of great quality, and I love knowing it’s grown rapidly. Highly suggested!",
            },
              {
              name: "Ashish Shinde ",
              
              text: "Their produce is top-quality, and I love knowing it’s grown ethically. Highly recommended!",
            },
          ].map((review, i) => (
            <div
              key={i}
              className="bg-white/80 backdrop-blur-lg p-6 rounded-xl shadow-lg hover:shadow-2xl transition duration-300"
            >
              <div className="flex items-center gap-4 mb-4">
                {/* <img
                  src={review.image}
                  alt={review.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-green-700"
                /> */}
                <h4 className="font-semibold text-green-800">{review.name}</h4>
              </div>
              <p className="italic text-gray-700">“{review.text}”</p>
            </div>
          ))}
        </div>
          {/* View More Reviews Button */}
        <div className="text-center mt-10">
          <Link
            to="/reviews"
            className="inline-block bg-rose-500 text-white px-8 py-3 rounded-full font-semibold shadow-md hover:bg-rose-700 transition duration-300"
          >
            View More Reviews
          </Link>
        </div>
        
      </div>

      
          
      {/* Final CTA */}
      <div className="text-center mt-10">
        <h3 className="text-3xl font-bold text-green-900 mb-4">Ready to Taste the Difference?</h3>
        <p className="mb-6 text-gray-700">Join our mission of healthy eating, strong soil, and connected community.</p>
        <Link to="/" className="bg-gradient-to-r from-red-600 to-yellow-500 hover:from-red-700 hover:to-yellow-600 text-white px-10 py-3 rounded-full font-bold shadow-lg transition-all duration-300">
          Shop Our Produce
        </Link>
        
      </div>
    </div>
  );
};

export default About;