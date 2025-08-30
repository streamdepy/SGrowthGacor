const { DataTypes, Model } = require("sequelize");
const sequelize = require("../config/database");

class SupportingDocument extends Model {}

SupportingDocument.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    document_name: { type: DataTypes.STRING(160), allowNull: false },
    file_url: { type: DataTypes.TEXT, allowNull: false },
    uploaded_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  },
  {
    sequelize,
    modelName: "SupportingDocument",
    tableName: "supporting_documents",
    timestamps: false,
  }
);

module.exports = SupportingDocument;
