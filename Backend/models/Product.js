const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  category: String,
  quantity: Number,
  expiryDate: Date,
  rating: Number,
  imageUrl: String,
  farmerId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});
module.exports = mongoose.model("Product", ProductSchema);
