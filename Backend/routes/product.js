const router = require('express').Router();
const Product = require('../models/Product');
const { authMiddleware, authorizeRoles } = require('../middleware/authMiddleware');

// View all products (public)
router.get('/', async (req, res) => {
  const products = await Product.find();
  res.json(products);
});


// Add new product (protected, farmer only)
router.post('/', authMiddleware, authorizeRoles('farmer'), async (req, res) => {
  try {
    const product = await Product.create({ ...req.body, farmerId: req.user.id });
    console.log(req.user);
    
    res.json(product);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

// Add this in routes/product.js

router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (e) {
    res.status(500).json({ message: "Error fetching product" });
  }
});

// Edit product (farmer only)
router.put('/:id', authMiddleware, authorizeRoles('farmer'), async (req, res) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(product);
});

// Delete product (farmer only)
router.delete('/:id', authMiddleware, authorizeRoles('farmer'), async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted' });
});

module.exports = router;