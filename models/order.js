import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Order = sequelize.define(
  "Order",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("PENDING", "PAID", "CANCELLED", "FULFILLED"),
      defaultValue: "PENDING",
    },
    total_fils: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "orders",
    timestamps: false,
  }
);

// Order.associate = (models) => {
//   Order.belongsTo(models.User, { foreignKey: "userId" });
//   Order.hasMany(models.OrderItem, { foreignKey: "orderId" });
// };

export default Order;
