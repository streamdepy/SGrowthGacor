const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const BusinessProfile = sequelize.define(
  "BusinessProfile",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    user_id: { type: DataTypes.INTEGER, allowNull: false },
    business_name: { type: DataTypes.STRING(120), allowNull: false },
    industry: { type: DataTypes.STRING(80) },
    address: { type: DataTypes.TEXT },
    created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  },
  {
    tableName: "business_profiles",
    timestamps: false,
  }
);

module.exports = BusinessProfile;
