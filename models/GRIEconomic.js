// models/GRIEconomic.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const BusinessProfile = require("./BusinessProfile");

const GRIEconomic = sequelize.define(
  "GRIEconomic",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },

    business_id: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: BusinessProfile,
        key: "id",
      },
      onDelete: "CASCADE",
    },

    // 📌 Bagian 1: Informasi Dasar
    unit_name: { type: DataTypes.STRING(150), allowNull: false },
    reporting_period: { type: DataTypes.STRING(100), allowNull: false },
    responsible_person: { type: DataTypes.STRING(150), allowNull: false },

    // 📌 Bagian 2: Data Pendapatan & Pengeluaran
    revenue: { type: DataTypes.DECIMAL(15, 2), defaultValue: 0 },

    general_admin_expenses: { type: DataTypes.DECIMAL(15, 2), defaultValue: 0 },
    general_admin_notes: { type: DataTypes.TEXT },

    salary_expenses: { type: DataTypes.DECIMAL(15, 2), defaultValue: 0 },
    salary_employee_notes: { type: DataTypes.TEXT },

    transport_expenses: { type: DataTypes.DECIMAL(15, 2), defaultValue: 0 },
    transport_notes: { type: DataTypes.TEXT },

    fuel_expenses: { type: DataTypes.DECIMAL(15, 2), defaultValue: 0 },
    electricity_expenses: { type: DataTypes.DECIMAL(15, 2), defaultValue: 0 },

    internet_expenses: { type: DataTypes.DECIMAL(15, 2), defaultValue: 0 },
    telephone_expenses: { type: DataTypes.DECIMAL(15, 2), defaultValue: 0 },
    water_expenses: { type: DataTypes.DECIMAL(15, 2), defaultValue: 0 },

    other_operating_expenses: { type: DataTypes.DECIMAL(15, 2), defaultValue: 0 },
    other_operating_notes: { type: DataTypes.TEXT },

    non_operating_expenses: { type: DataTypes.DECIMAL(15, 2), defaultValue: 0 },
    non_operating_notes: { type: DataTypes.TEXT },

    // 📌 Bagian 3: Catatan Tambahan
    unusual_expenses_flag: { type: DataTypes.BOOLEAN, defaultValue: false },
    unusual_expenses_notes: { type: DataTypes.TEXT },
    accounting_adjustment_flag: { type: DataTypes.BOOLEAN, defaultValue: false },
    accounting_adjustment_notes: { type: DataTypes.TEXT },

    created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    updated_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  },
  {
    tableName: "gri_economics",
    timestamps: false,
  }
);

// 🔗 Relasi
BusinessProfile.hasMany(GRIEconomic, { foreignKey: "business_id" });
GRIEconomic.belongsTo(BusinessProfile, { foreignKey: "business_id" });

module.exports = GRIEconomic;
