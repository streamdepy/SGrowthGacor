const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const GRISubmission = require("./GRISubmission");

const SupportingDocument = sequelize.define("SupportingDocument", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  document_name: { type: DataTypes.STRING(160), allowNull: false },
  file_url: { type: DataTypes.TEXT, allowNull: false },
  uploaded_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
}, {
  tableName: "supporting_documents",
  timestamps: false
});

GRISubmission.hasMany(SupportingDocument, { foreignKey: "submission_id" });
SupportingDocument.belongsTo(GRISubmission, { foreignKey: "submission_id" });

module.exports = SupportingDocument;
