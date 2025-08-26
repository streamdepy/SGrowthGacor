const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Booking = require("./Booking");
const User = require("./user");

const BookingMessage = sequelize.define("BookingMessage", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  booking_id: { type: DataTypes.INTEGER, allowNull: false },
  sender_user_id: { type: DataTypes.INTEGER, allowNull: false },
  message: { type: DataTypes.TEXT, allowNull: false },
  sent_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
}, {
  tableName: "booking_messages",
  timestamps: false
});

Booking.hasMany(BookingMessage, { foreignKey: "booking_id" });
BookingMessage.belongsTo(Booking, { foreignKey: "booking_id" });

User.hasMany(BookingMessage, { foreignKey: "sender_user_id" });
BookingMessage.belongsTo(User, { foreignKey: "sender_user_id" });

module.exports = BookingMessage;
