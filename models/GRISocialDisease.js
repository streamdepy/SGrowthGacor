// models/GRISocialDisease.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const GRISocial = require("./GRISocial");

const GRISocialDisease = sequelize.define("GRISocialDisease", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  social_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: GRISocial, key: "id" },
    onDelete: "CASCADE",
  },
  total_disease_cases: { type: DataTypes.INTEGER, defaultValue: 0 },
  disease_type: { type: DataTypes.STRING(100) },
  affected_unit: { type: DataTypes.STRING(100) },
  prevention_actions: { type: DataTypes.TEXT },
}, {
  tableName: "gri_social_diseases",
  timestamps: true,
  underscored: true,
});

GRISocial.hasMany(GRISocialDisease, { foreignKey: "social_id", as: "diseases" });
GRISocialDisease.belongsTo(GRISocial, { foreignKey: "social_id" });

module.exports = GRISocialDisease;
