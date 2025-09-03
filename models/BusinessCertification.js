const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const BusinessCertification = sequelize.define("BusinessCertification", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  business_id: { type: DataTypes.STRING, allowNull: false },
  certification_name: { type: DataTypes.STRING(120), allowNull: false },
}, {
  tableName: "business_certifications",
  timestamps: false
});

module.exports = BusinessCertification;
