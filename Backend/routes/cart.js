const router = require('express').Router();
const Cart = require('../models/Cart');
const { authMiddleware, authorizeRoles } = require('../middleware/authMiddleware');

// Get cart
router.get('/', authMiddleware, authorizeRoles('customer'), async (req, res) => {
  const cart = await Cart.findOne({ customerId: req.user.id }).populate('items.productId');
  res.json(cart || { customerId: req.user.id, items: [] });
});

// Add to cart
router.post('/add', authMiddleware, authorizeRoles('customer'), async (req, res) => {
  const { productId, quantity } = req.body;
  let cart = await Cart.findOne({ customerId: req.user.id });

  if (!cart) {
    cart = await Cart.create({ customerId: req.user.id, items: [] });
  }

  const existingItem = cart.items.find(item => item.productId.toString() === productId);
  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.items.push({ productId, quantity });
  }

  await cart.save();
  res.json(cart);
});

// Remove from cart
router.post('/remove', authMiddleware, authorizeRoles('customer'), async (req, res) => {
  const { productId } = req.body;
  const cart = await Cart.findOne({ customerId: req.user.id });

  if (cart) {
    cart.items = cart.items.filter(item => item.productId.toString() !== productId);
    await cart.save();
  }

  res.json(cart);
});
module.exports = router;
