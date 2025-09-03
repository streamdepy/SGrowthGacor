const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const BusinessShareholder = sequelize.define("BusinessShareholder", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  business_id: { type: DataTypes.STRING, allowNull: false },
  shareholder_name: { type: DataTypes.STRING(180), allowNull: false },
  ownership_percentage: { type: DataTypes.DECIMAL(5,2) },
}, {
  tableName: "business_shareholders",
  timestamps: false
});

module.exports = BusinessShareholder;
