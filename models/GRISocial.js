// models/GRISocial.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const BusinessProfile = require("./BusinessProfile");

const GRISocial = sequelize.define("GRISocial", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  operational_location: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  business_id: {
    type: DataTypes.STRING(255),
    allowNull: false,
    references: {
      model: BusinessProfile,
      key: "id",
    },
    onDelete: "CASCADE",
  },
  reporting_period: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },

  // =========================
  // Bagian 1: K3
  // =========================
  has_incident: { type: DataTypes.BOOLEAN, defaultValue: false },
  total_injuries: { type: DataTypes.INTEGER, defaultValue: 0 },
  total_fatalities: { type: DataTypes.INTEGER, defaultValue: 0 },
  main_incident_type: { type: DataTypes.STRING(100) },
  incident_location: { type: DataTypes.STRING(100) },
  incident_cause: { type: DataTypes.STRING(100) },
  lost_workdays: { type: DataTypes.INTEGER, defaultValue: 0 },
  corrective_actions: { type: DataTypes.TEXT },

  // =========================
  // Bagian 2: Penyakit Akibat Kerja
  // =========================
  has_disease: { type: DataTypes.BOOLEAN, defaultValue: false },
  total_disease_cases: { type: DataTypes.INTEGER, defaultValue: 0 },
  disease_type: { type: DataTypes.STRING(100) },
  affected_unit: { type: DataTypes.STRING(100) },
  prevention_actions: { type: DataTypes.TEXT },

  // =========================
  // Bagian 3: Pelatihan K3
  // =========================
  has_training: { type: DataTypes.BOOLEAN, defaultValue: false },
  participants_count: { type: DataTypes.INTEGER, defaultValue: 0 },
  total_employees: { type: DataTypes.INTEGER, defaultValue: 0 },
  trained_percentage: { type: DataTypes.DECIMAL(5, 2), defaultValue: 0.0 },
  training_type: { type: DataTypes.STRING(100) },
  training_frequency: { type: DataTypes.STRING(50) },
  documentation_file: { type: DataTypes.STRING(255) },
  documentation_link: { type: DataTypes.STRING(255) },

  // =========================
  // Bagian 4: Catatan & Konteks
  // =========================
  challenges: { type: DataTypes.TEXT },
  improvement_plan: { type: DataTypes.TEXT },

  // =========================
  // Bagian 5: Ringkasan Otomatis
  // =========================
  ltifr: { type: DataTypes.DECIMAL(10, 2), defaultValue: 0.0 },
  trained_percentage_summary: { type: DataTypes.DECIMAL(5, 2), defaultValue: 0.0 },
}, {
  tableName: "gri_social",
  timestamps: true,
  underscored: true,
});

// Relasi ke BusinessProfile
GRISocial.belongsTo(BusinessProfile, { foreignKey: "business_id" });

module.exports = GRISocial;
