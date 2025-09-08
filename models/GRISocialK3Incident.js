// models/GRISocialK3Incident.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const GRISocial = require("./GRISocial");

const GRISocialK3Incident = sequelize.define("GRISocialK3Incident", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  social_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: GRISocial, key: "id" },
    onDelete: "CASCADE",
  },
  total_injuries: { type: DataTypes.INTEGER, defaultValue: 0 },
  total_fatalities: { type: DataTypes.INTEGER, defaultValue: 0 },
  main_incident_type: { type: DataTypes.STRING(100) },
  incident_location: { type: DataTypes.STRING(100) },
  incident_cause: { type: DataTypes.STRING(100) },
  lost_workdays: { type: DataTypes.INTEGER, defaultValue: 0 },
  corrective_actions: { type: DataTypes.TEXT },
}, {
  tableName: "gri_social_k3_incidents",
  timestamps: true,
  underscored: true,
});

GRISocial.hasMany(GRISocialK3Incident, { foreignKey: "social_id", as: "k3_incidents" });
GRISocialK3Incident.belongsTo(GRISocial, { foreignKey: "social_id" });

module.exports = GRISocialK3Incident;
