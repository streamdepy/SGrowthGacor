const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const BusinessProfile = require("./BusinessProfile");

const Certificate = sequelize.define("Certificate", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  business_id: { type: DataTypes.STRING, allowNull: false },
  certificate_number: { type: DataTypes.STRING(80), unique: true },
  certificate_url: { type: DataTypes.TEXT, allowNull: false },
  issued_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
}, {
  tableName: "certificates",
  timestamps: false
});

BusinessProfile.hasMany(Certificate, { foreignKey: "business_id" });
Certificate.belongsTo(BusinessProfile, { foreignKey: "business_id" });

module.exports = Certificate;
