// models/GRISocialTraining.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const GRISocial = require("./GRISocial");

const GRISocialTraining = sequelize.define("GRISocialTraining", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  social_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: GRISocial, key: "id" },
    onDelete: "CASCADE",
  },
  participants_count: { type: DataTypes.INTEGER, defaultValue: 0 },
  total_employees: { type: DataTypes.INTEGER, defaultValue: 0 },
  trained_percentage: { type: DataTypes.DECIMAL(5,2), defaultValue: 0.0 },
  training_type: { type: DataTypes.STRING(100) },
  training_frequency: { type: DataTypes.STRING(50) },
  documentation_file: { type: DataTypes.STRING(255) },
  documentation_link: { type: DataTypes.STRING(255) },
}, {
  tableName: "gri_social_trainings",
  timestamps: true,
  underscored: true,
});

GRISocial.hasMany(GRISocialTraining, { foreignKey: "social_id", as: "trainings" });
GRISocialTraining.belongsTo(GRISocial, { foreignKey: "social_id" });

module.exports = GRISocialTraining;
