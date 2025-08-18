const router = require('express').Router();
const Notification = require('../models/Notification');
const { authMiddleware } = require('../middleware/authMiddleware');

// Get all notifications for logged-in user
router.get('/', authMiddleware, async (req, res) => {
  try {
    const notes = await Notification.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json(notes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Mark a specific notification as read
router.post('/mark-read/:id', authMiddleware, async (req, res) => {
  try {
    const note = await Notification.findByIdAndUpdate(req.params.id, { read: true }, { new: true });
    res.json(note);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete notification by ID
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const notification = await Notification.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id, // match your schema field
    });

    if (!notification) {
      return res.status(404).json({ message: 'Notification not found' });
    }

    res.json({ message: 'Notification deleted successfully' });
  } catch (err) {
    console.error('Error deleting notification:', err);
    res.status(500).json({ message: 'Server error' });
  }
});



// Get notifications for a specific order
router.get('/order/:orderId', authMiddleware, async (req, res) => {
  try {
    const notes = await Notification.find({
      userId: req.user.id,
      orderId: req.params.orderId
    }).sort({ createdAt: -1 });
    res.json(notes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


module.exports = router;