const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const User = require("./user");

const ChatLog = sequelize.define("ChatLog", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  user_id: { type: DataTypes.INTEGER, allowNull: false },
  question: { type: DataTypes.TEXT, allowNull: false },
  response: { type: DataTypes.TEXT("medium") },
  created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
}, {
  tableName: "chat_logs",
  timestamps: false
});

User.hasMany(ChatLog, { foreignKey: "user_id" });
ChatLog.belongsTo(User, { foreignKey: "user_id" });

module.exports = ChatLog;
