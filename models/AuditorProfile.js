const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const User = require("./user");

const AuditorProfile = sequelize.define("AuditorProfile", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  headline: { type: DataTypes.STRING(200) },
  bio: { type: DataTypes.TEXT },
  years_experience: { type: DataTypes.INTEGER, defaultValue: 0 },
  expertise_area: { type: DataTypes.STRING(160) },
  hourly_rate: { type: DataTypes.DECIMAL(12,2) },
  currency: { type: DataTypes.STRING(10), defaultValue: "IDR" },
  cv_url: { type: DataTypes.TEXT },
  linkedin_url: { type: DataTypes.TEXT },
  created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
}, {
  tableName: "auditor_profiles",
  timestamps: false
});

User.hasOne(AuditorProfile, { foreignKey: "user_id" });
AuditorProfile.belongsTo(User, { foreignKey: "user_id" });

module.exports = AuditorProfile;
