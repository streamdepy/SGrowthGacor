const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Booking = sequelize.define(
  "Booking",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    business_id: { type: DataTypes.STRING, allowNull: false },
    auditor_id: { type: DataTypes.INTEGER, allowNull: false },
    status: {
      type: DataTypes.ENUM("pending", "confirmed", "rejected", "completed", "cancelled"),
      defaultValue: "pending",
    },
    purpose: { type: DataTypes.STRING(200) },
    scheduled_at: { type: DataTypes.DATE },
    duration_minutes: { type: DataTypes.INTEGER, defaultValue: 60 },
    price: { type: DataTypes.DECIMAL(12, 2), defaultValue: 0.0 },
    currency: { type: DataTypes.STRING(10), defaultValue: "IDR" },
    notes: { type: DataTypes.TEXT },
    created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    updated_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  },
  {
    tableName: "bookings",
    timestamps: false,
  }
);

module.exports = Booking;
