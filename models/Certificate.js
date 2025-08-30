const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const BlockchainHash = sequelize.define(
  "BlockchainHash",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    certificate_id: { type: DataTypes.INTEGER, allowNull: false },
    hash_value: { type: DataTypes.STRING(256), allowNull: false },
    chain_name: { type: DataTypes.STRING(60), defaultValue: "Polygon" },
    tx_hash: { type: DataTypes.STRING(120) },
    recorded_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  },
  {
    tableName: "blockchain_hashes",
    timestamps: false,
  }
);

module.exports = BlockchainHash;
