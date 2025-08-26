const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const BusinessProfile = require("./BusinessProfile");

const ESGScore = sequelize.define("ESGScore", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  business_id: { type: DataTypes.INTEGER, allowNull: false },
  score_environment: { type: DataTypes.DECIMAL(4,2), defaultValue: 0.00 },
  score_social: { type: DataTypes.DECIMAL(4,2), defaultValue: 0.00 },
  score_economic: { type: DataTypes.DECIMAL(4,2), defaultValue: 0.00 },
  total_score: { type: DataTypes.DECIMAL(5,2), defaultValue: 0.00  },
  scored_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
}, {
  tableName: "esg_scores",
  timestamps: false
});

BusinessProfile.hasMany(ESGScore, { foreignKey: "business_id" });
ESGScore.belongsTo(BusinessProfile, { foreignKey: "business_id" });

module.exports = ESGScore;
