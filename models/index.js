import sequelize from "../config/db.js";

import User from "./User.js";
import Product from "./product.js";
import Order from "./order.js";
import OrderItem from "./orderItems.js";

// Direct associations here
Order.belongsTo(User, { foreignKey: "userId" });
Order.hasMany(OrderItem, { foreignKey: "orderId", as: "items" });

OrderItem.belongsTo(Order, { foreignKey: "orderId" });
OrderItem.belongsTo(Product, { foreignKey: "productId", as: "product" });

export { sequelize, User, Product, Order, OrderItem };
