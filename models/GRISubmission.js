const { DataTypes, Model } = require("sequelize");
const sequelize = require("../config/database");

class GRISubmission extends Model {}

GRISubmission.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    business_id: { type: DataTypes.STRING, allowNull: false },
    gri_code: { type: DataTypes.STRING(50), allowNull: false },
    section: {
      type: DataTypes.ENUM("general", "economic", "environmental", "social", "governance"),
      allowNull: false,
    },
    input_data: { type: DataTypes.JSON },
    period_start: { type: DataTypes.DATE },
    period_end: { type: DataTypes.DATE },
    created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  },
  {
    sequelize,
    modelName: "GRISubmission",
    tableName: "gri_submissions",
    timestamps: false,
  }
);

module.exports = GRISubmission;
