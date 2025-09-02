// models/business_profile.js

const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const BusinessProfile = sequelize.define(
  "BusinessProfile",
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    business_name: {
      type: DataTypes.STRING(180),
      allowNull: false,
    },
    business_activity: {
      type: DataTypes.ENUM("Produksi", "Jasa", "Distribusi", "Lainnya"),
    },
    address: {
      type: DataTypes.TEXT,
    },
    city: {
      type: DataTypes.STRING(100),
    },
    province: {
      type: DataTypes.STRING(100),
    },
    business_entity: {
      type: DataTypes.STRING(100),
    },

    market_activity: {
      type: DataTypes.ENUM("Lokal", "Domestik", "Ekspor"),
    },
    employee_count: {
      type: DataTypes.INTEGER,
    },
    monthly_volume: {
      type: DataTypes.STRING(100),
    },
    annual_revenue: {
      type: DataTypes.DECIMAL(15, 2),
    },

    permanent_employees: {
      type: DataTypes.INTEGER,
    },
    contract_employees: {
      type: DataTypes.INTEGER,
    },

    standards: {
      type: DataTypes.TEXT,
    },
    notes: {
      type: DataTypes.TEXT,
    },

    stakeholders: {
      type: DataTypes.TEXT,
    },
    engagement_approach: {
      type: DataTypes.TEXT,
    },

    material_topics: {
      type: DataTypes.TEXT,
    },
    pic_name: {
      type: DataTypes.STRING(120),
    },
    pic_phone: {
      type: DataTypes.STRING(50),
    },
    pic_email: {
      type: DataTypes.STRING(120),
    },

    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "business_profiles",
    timestamps: false,
  }
);

module.exports = BusinessProfile;
