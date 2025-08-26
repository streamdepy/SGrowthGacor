const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const BusinessProfile = require("./BusinessProfile");

const GRISubmission = sequelize.define("GRISubmission", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  gri_code: { type: DataTypes.STRING(50), allowNull: false },
  section: { type: DataTypes.ENUM("general","economic","environmental","social"), allowNull: false },
  input_data: { type: DataTypes.JSON },
  period_start: { type: DataTypes.DATE },
  period_end: { type: DataTypes.DATE },
  created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
}, {
  tableName: "gri_submissions",
  timestamps: false
});

BusinessProfile.hasMany(GRISubmission, { foreignKey: "business_id" });
GRISubmission.belongsTo(BusinessProfile, { foreignKey: "business_id" });

module.exports = GRISubmission;
