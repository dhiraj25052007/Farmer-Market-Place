const router = require('express').Router();
const Order = require('../models/Order');
const { authMiddleware, authorizeRoles } = require('../middleware/authMiddleware');
const Notification = require('../models/Notification');
const Product = require('../models/Product');

// Place order (customer only)



router.post('/', authMiddleware, authorizeRoles('customer'), async (req, res) => {
  try {
      console.log('📦 Order payload received:', req.body);
    const order = await Order.create(req.body);

    for (const item of req.body.items) {
      const product = await Product.findById(item.productId);
      if (product?.farmerId) {
        await Notification.create({
          userId: product.farmerId,
          orderId: order._id,
          message: `New order received for product: ${product.name}`
        });
      }
    }

    res.json(order);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});


// View user's orders (customer only)
router.get('/user/:id', authMiddleware, authorizeRoles('customer'), async (req, res) => {
  const orders = await Order.find({ customerId: req.params.id }).populate('items.productId');
  res.json(orders);
});

module.exports = router;

// Cancel (delete) order
router.delete('/:id', authMiddleware, authorizeRoles('customer'), async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.json({ message: 'Order cancelled' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// routes/orderRoutes.js

// Update order status (farmer only)
router.put('/:id/status', authMiddleware, authorizeRoles('farmer'), async (req, res) => {
  try {
    const { status } = req.body;
    if (!["Pending", "Processing", "Shipped", "Delivered", "Cancelled"].includes(status)) {
      return res.status(400).json({ error: "Invalid status" });
    }

    const order = await Order.findById(req.params.id).populate('items.productId');
    if (!order) return res.status(404).json({ error: "Order not found" });

    // Check if farmer owns at least one product in this order
    const ownsProduct = order.items.some(item => 
      item.productId.farmerId?.toString() === req.user.id
    );
    if (!ownsProduct) {
      return res.status(403).json({ error: "Not authorized to update this order" });
    }

    order.status = status;
    await order.save();

    // Optional: notify customer
    await Notification.create({
      userId: order.customerId,
      orderId: order._id,
      message: `Your order #${order._id} status is now: ${status}`
    });

    res.json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Track order (customer only)
router.get('/track/:id', authMiddleware, authorizeRoles('customer'), async (req, res) => {
  const order = await Order.findOne({
    _id: req.params.id,
    customerId: req.user.id
  }).populate('items.productId');

  if (!order) return res.status(404).json({ error: "Order not found" });

  // Latest notification for this order
  const latestNote = await Notification.findOne({
    orderId: order._id,
    userId: req.user.id
  }).sort({ createdAt: -1 });

  res.json({
    status: order.status,
    lastUpdate: order.statusUpdatedAt,
    latestMessage: latestNote?.message || null
  });
});
