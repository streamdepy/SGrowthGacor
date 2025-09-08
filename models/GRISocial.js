// models/GRISocial.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const BusinessProfile = require("./BusinessProfile");

const GRISocial = sequelize.define("GRISocial", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  business_id: {
    type: DataTypes.STRING(255),
    allowNull: false,
    references: { model: BusinessProfile, key: "id" },
    onDelete: "CASCADE",
  },
  operational_location: { type: DataTypes.STRING(255), allowNull: false },
  reporting_period: { type: DataTypes.STRING(50), allowNull: false },

  // Flags ringkasan
  has_incident: { type: DataTypes.BOOLEAN, defaultValue: false },
  has_disease: { type: DataTypes.BOOLEAN, defaultValue: false },
  has_training: { type: DataTypes.BOOLEAN, defaultValue: false },

  // Catatan umum
  challenges: { type: DataTypes.TEXT },
  improvement_plan: { type: DataTypes.TEXT },

  // Ringkasan
  ltifr: { type: DataTypes.DECIMAL(10, 2), defaultValue: 0.0 },
  trained_percentage_summary: { type: DataTypes.DECIMAL(5, 2), defaultValue: 0.0 },
}, {
  tableName: "gri_social",
  timestamps: true,
  underscored: true,
});

GRISocial.belongsTo(BusinessProfile, { foreignKey: "business_id" });

module.exports = GRISocial;
