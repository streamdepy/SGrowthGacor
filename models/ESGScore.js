const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const ESGScore = sequelize.define(
  "ESGScore",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    business_id: { type: DataTypes.STRING, allowNull: false },
    score_environment: { type: DataTypes.DECIMAL(4, 2), defaultValue: 0.0 },
    score_social: { type: DataTypes.DECIMAL(4, 2), defaultValue: 0.0 },
    score_economic: { type: DataTypes.DECIMAL(4, 2), defaultValue: 0.0 },
    score_governance: { type: DataTypes.DECIMAL(4, 2), defaultValue: 0.0 },
    total_score: { type: DataTypes.DECIMAL(5, 2) },
    scored_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  },
  {
    tableName: "esg_scores",
    timestamps: false,
  }
);

module.exports = ESGScore;
