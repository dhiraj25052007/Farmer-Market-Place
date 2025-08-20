// orderStatusScheduler.js
const Order = require('../models/Order');
const Notification = require('../models/Notification');

const STATUS_FLOW = ["Pending", "Processing", "Shipped", "Delivered"];
const INTERVAL_MINUTES = 3;

async function updateOrderStatuses() {
  const now = Date.now();
  const orders = await Order.find({
    status: { $in: ["Pending", "Processing", "Shipped"] }
  });

  for (let order of orders) {
    const minutesSinceUpdate = (now - new Date(order.statusUpdatedAt).getTime()) / (1000 * 60);
    if (minutesSinceUpdate >= INTERVAL_MINUTES) {
      const currentIndex = STATUS_FLOW.indexOf(order.status);
      if (currentIndex !== -1 && currentIndex < STATUS_FLOW.length - 1) {
        order.status = STATUS_FLOW[currentIndex + 1];
        order.statusUpdatedAt = now;
        await order.save();

        // Notify customer
        await Notification.create({
          userId: order.customerId,
          message: `Your order #${order._id} status changed to ${order.status}`
        });

        console.log(`✅ Order ${order._id} moved to ${order.status}`);
      }
    }
  }
}

// Run every minute
setInterval(updateOrderStatuses, 60 * 1000);

module.exports = updateOrderStatuses;
