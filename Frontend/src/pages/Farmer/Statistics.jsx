// File: src/pages/Statistics.jsx

import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend,
  ResponsiveContainer,
  ComposedChart,
  Line,
  CartesianGrid
} from "recharts";
import { motion } from "framer-motion";

const salesData = [
  { name: "Tomatoes", sales: 400 },
  { name: "Potatoes", sales: 300 },
  { name: "Onions", sales: 200 },
  { name: "Carrots", sales: 278 },
  { name: "Apples", sales: 189 },
];

const revenueData = [
  { name: "Fruits", value: 5000 },
  { name: "Vegetables", value: 3500 },
  { name: "Dairy", value: 2000 },
  { name: "Grains", value: 1500 },
];

const monthlyData = [
  { month: "Jan", orders: 40 },
  { month: "Feb", orders: 55 },
  { month: "Mar", orders: 60 },
  { month: "Apr", orders: 75 },
  { month: "May", orders: 90 },
  { month: "Jun", orders: 100 },
];

const COLORS = ["#34d399", "#10b981", "#6ee7b7", "#059669"];
const BAR_COLORS = ["#22c55e", "#16a34a", "#4ade80", "#65a30d", "#84cc16"];

const Statistics = () => {
  return (
    <motion.div
      className="min-h-screen py-12 px-6 lg:px-20 font-sans"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <motion.h2
        className="text-5xl font-bold text-emerald-800 text-center mb-12 tracking-wide"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        📊 FarmFresh Insights
      </motion.h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Bar Chart */}
        <motion.div
          className="bg-white p-6 rounded-3xl shadow-xl hover:shadow-emerald-300 transition-shadow duration-300"
          whileHover={{ scale: 1.01 }}
        >
          <h3 className="text-2xl font-semibold text-emerald-700 mb-4">Top Product Sales</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={salesData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="sales" radius={[8, 8, 0, 0]} animationDuration={1200}>
                {salesData.map((entry, index) => (
                  <Cell key={`bar-${index}`} fill={BAR_COLORS[index % BAR_COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Pie Chart */}
        <motion.div
          className="bg-white p-6 rounded-3xl shadow-xl hover:shadow-lime-300 transition-shadow duration-300"
          whileHover={{ scale: 1.01 }}
        >
          <h3 className="text-2xl font-semibold text-lime-700 mb-4">Revenue Breakdown</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={revenueData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                dataKey="value"
                animationDuration={1200}
              >
                {revenueData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Legend verticalAlign="bottom" />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Composed Chart (Bar + Line) */}
      <motion.div
        className="bg-white p-6 rounded-3xl shadow-xl hover:shadow-green-300 transition-shadow duration-300 mt-12 max-w-3xl mx-auto"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        whileHover={{ scale: 1.01 }}
      >
        <h3 className="text-2xl font-semibold text-green-700 mb-4 text-center">
          Monthly Orders Trend
        </h3>
        <ResponsiveContainer width="100%" height={350}>
          <ComposedChart data={monthlyData}>
            <CartesianGrid stroke="#f5f5f5" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="orders" barSize={20} fill="#34d399" animationDuration={1200} />
            <Line type="monotone" dataKey="orders" stroke="#059669" strokeWidth={3} dot={{ r: 5 }} animationDuration={1200} />
          </ComposedChart>
        </ResponsiveContainer>
      </motion.div>
    </motion.div>
  );
};

export default Statistics;
