const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Booking = require("./Booking");

const Payment = sequelize.define("Payment", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  booking_id: { type: DataTypes.INTEGER, allowNull: false, unique: true },
  amount: { type: DataTypes.DECIMAL(12,2), allowNull: false },
  currency: { type: DataTypes.STRING(10), defaultValue: "IDR" },
  method: { type: DataTypes.ENUM("transfer","va","ewallet","card","other"), defaultValue: "transfer" },
  status: { type: DataTypes.ENUM("pending","paid","failed","refunded"), defaultValue: "pending" },
  provider: { type: DataTypes.STRING(60) },
  transaction_ref: { type: DataTypes.STRING(120) },
  paid_at: { type: DataTypes.DATE },
  created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
}, {
  tableName: "payments",
  timestamps: false
});

Booking.hasOne(Payment, { foreignKey: "booking_id" });
Payment.belongsTo(Booking, { foreignKey: "booking_id" });

module.exports = Payment;
