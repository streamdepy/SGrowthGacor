const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const AuditorProfile = require("./AuditorProfile");

const AuditorPortfolio = sequelize.define("AuditorPortfolio", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  title: { type: DataTypes.STRING(200), allowNull: false },
  description: { type: DataTypes.TEXT },
  file_url: { type: DataTypes.TEXT },
  link_url: { type: DataTypes.TEXT },
  created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
}, {
  tableName: "auditor_portfolios",
  timestamps: false
});

AuditorProfile.hasMany(AuditorPortfolio, { foreignKey: "auditor_id" });
AuditorPortfolio.belongsTo(AuditorProfile, { foreignKey: "auditor_id" });

module.exports = AuditorPortfolio;
