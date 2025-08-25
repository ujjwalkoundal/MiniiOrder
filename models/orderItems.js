import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const OrderItem = sequelize.define(
  "OrderItem",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    orderId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    productId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    qty: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
    unit_price_fils: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    line_total_fils: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "order_items",
    timestamps: false,
  }
);

// OrderItem.associate = (models) => {
//   OrderItem.belongsTo(models.Order, { foreignKey: "orderId" });
//   OrderItem.belongsTo(models.Product, { foreignKey: "productId" });
// };

export default OrderItem;
