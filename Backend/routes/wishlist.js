const router = require('express').Router();
const Wishlist = require('../models/Wishlist');
const { authMiddleware, authorizeRoles } = require('../middleware/authMiddleware');

// Add a product to wishlist
router.post('/add', authMiddleware, authorizeRoles('customer'), async (req, res) => {
  try {
    const { productId } = req.body;
    let wishlist = await Wishlist.findOne({ customerId: req.user.id });

    if (!wishlist) {
      wishlist = await Wishlist.create({ customerId: req.user.id, products: [] });
    }

    if (!wishlist.products.includes(productId)) {
      wishlist.products.push(productId);
      await wishlist.save();
    }

    res.json(wishlist);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Remove a product from wishlist
router.post('/remove', authMiddleware, authorizeRoles('customer'), async (req, res) => {
  try {
    const { productId } = req.body;
    const wishlist = await Wishlist.findOne({ customerId: req.user.id });

    if (wishlist) {
      wishlist.products = wishlist.products.filter(pid => pid.toString() !== productId);
      await wishlist.save();
    }

    res.json(wishlist);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get current user's wishlist
router.get('/', authMiddleware, authorizeRoles('customer'), async (req, res) => {
  try {
    const wishlist = await Wishlist.findOne({ customerId: req.user.id }).populate('products');
    res.json(wishlist || { customerId: req.user.id, products: [] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
