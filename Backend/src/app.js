const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const authRoutes = require("../routes/auth");
const productRoutes = require("../routes/product");
const orderRoutes = require("../routes/order");
const statsRoutes = require("../routes/stats");
const reviewRoutes = require("../routes/review");
const userRoutes=require("../routes/userRoutes")
const wishlistRoutes = require("../routes/wishlist");
const notificationRoutes = require("../routes/notification");
const cartRoutes = require("../routes/cart");
const  orderStatusScheduler = require('../routes/orderStatusSheduler');


dotenv.config({ path: "../.env" });
const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://farmfresh-main.netlify.app",
    ],
    credentials: true, // allow cookies/token
  })
);

app.use(express.json());

app.use("/api/cart", cartRoutes);
app.use("/api/users", userRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/stats", statsRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/wishlist", wishlistRoutes);

orderStatusScheduler;


mongoose
  .connect(process.env.MONGO_URI )
  .then(() =>
    app.listen(process.env.PORT , () => console.log("Server running on port 5000"))
  )
  .catch((err) => console.error(err));
