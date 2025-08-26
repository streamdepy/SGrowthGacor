const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const GRISubmission = require("./GRISubmission");
const User = require("./user");

const ValidationResult = sequelize.define("ValidationResult", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  submission_id: { type: DataTypes.INTEGER, allowNull: false },
  validator_type: { type: DataTypes.ENUM("ai", "auditor"), defaultValue: "ai" },
  validator_user_id: { type: DataTypes.INTEGER, allowNull: true },
  validation_summary: { type: DataTypes.TEXT },
  is_valid: { type: DataTypes.BOOLEAN },
  ai_feedback: { type: DataTypes.TEXT },
  validated_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
}, {
  tableName: "validation_results",
  timestamps: false
});

GRISubmission.hasMany(ValidationResult, { foreignKey: "submission_id" });
ValidationResult.belongsTo(GRISubmission, { foreignKey: "submission_id" });

User.hasMany(ValidationResult, { foreignKey: "validator_user_id" });
ValidationResult.belongsTo(User, { foreignKey: "validator_user_id" });

module.exports = ValidationResult;
