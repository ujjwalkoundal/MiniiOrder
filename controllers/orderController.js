// import Order from "../models/Order.js";
// import OrderItem from "../models/orderItems.js";
// import Product from "../models/Product.js";
import { Order, OrderItem, Product, User } from "../models/index.js";
import sequelize from "../config/db.js";

// ✅ Place new order
export const createOrder = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const userId = req.user.id;
    const { items } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: "No items in order" });
    }

    let total_fils = 0;
    const orderItems = [];

    // validate stock + calculate price
    for (const item of items) {
      const product = await Product.findByPk(item.productId, { transaction: t });
      if (!product || !product.isActive) {
        throw new Error(`Product ${item.productId} not found or inactive`);
      }
      if (product.stock < item.qty) {
        throw new Error(`Not enough stock for ${product.title}`);
      }

      const line_total_fils = product.price_aed * item.qty;
      total_fils += line_total_fils;

      // decrement stock
      product.stock -= item.qty;
      await product.save({ transaction: t });

      orderItems.push({
        productId: product.id,
        qty: item.qty,
        unit_price_fils: product.price_aed,
        line_total_fils,
      });
    }

    // create order
    const order = await Order.create({ userId, status: "PENDING", total_fils }, { transaction: t });

    // create order items
    for (const oi of orderItems) {
      await OrderItem.create({ ...oi, orderId: order.id }, { transaction: t });
    }

    await t.commit();
    res.status(201).json(order);
  } catch (err) {
    await t.rollback();
    res.status(400).json({ message: err.message });
  }
};

// ✅ Get current user orders (admin sees all)
export const getOrders = async (req, res) => {
  try {
    const { status } = req.query;
    const where = {};

    if (status) where.status = status;
    if (req.user.role !== "admin") where.userId = req.user.id;

    const orders = await Order.findAll({
      where,
      include: [{ model: OrderItem, as: "items", include: [{ model: Product, as: "product" }]  }],
      order: [["createdAt", "DESC"]],
    });

    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// ✅ Get single order
export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.id, {
      include: [{ model: OrderItem, as: "items", include: [{ model: Product, as: "product" }]  }],
    });

    if (!order) return res.status(404).json({ message: "Order not found" });

    if (req.user.role !== "ADMIN" && order.userId !== req.user.id) {
      return res.status(403).json({ message: "Forbidden" });
    }

    res.json(order);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// ✅ Update status (admin only)
export const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const valid = ["PAID", "CANCELLED", "FULFILLED"];
    if (!valid.includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const order = await Order.findByPk(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });

    order.status = status;
    await order.save();

    res.json(order);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
