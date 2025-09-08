const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const BusinessProfile = require("./BusinessProfile");

const GRIEnvironment = sequelize.define("GRIEnvironment", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
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
  unit_name: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  operational_location: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  reporting_period: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  period_year: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  calculation_method: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
}, {
  tableName: "gri_environment",
  timestamps: true,
  underscored: true,
});

// Relasi ke BusinessProfile
GRIEnvironment.belongsTo(BusinessProfile, { foreignKey: "business_id" });

module.exports = GRIEnvironment;
