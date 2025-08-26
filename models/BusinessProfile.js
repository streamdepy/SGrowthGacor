const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const User = require("./user");

const BusinessProfile = sequelize.define("BusinessProfile", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  business_name: { type: DataTypes.STRING(180), allowNull: false },
  business_scale: { type: DataTypes.ENUM("small","medium"), allowNull: false },
  industry_category: { type: DataTypes.STRING(120) },
  location: { type: DataTypes.STRING(180) },
  logo_url: { type: DataTypes.TEXT },
  created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
}, {
  tableName: "business_profiles",
  timestamps: false
});

User.hasOne(BusinessProfile, { foreignKey: "user_id" });
BusinessProfile.belongsTo(User, { foreignKey: "user_id" });

module.exports = BusinessProfile;
