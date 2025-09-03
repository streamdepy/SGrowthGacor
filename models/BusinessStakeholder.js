const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const BusinessStakeholder = sequelize.define("BusinessStakeholder", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  business_id: { type: DataTypes.STRING, allowNull: false },
  stakeholder_type: { 
    type: DataTypes.ENUM(
      "Pelanggan","Karyawan","Pemasok","Pemerintah/Regulator",
      "Investor/Shareholder","Masyarakat Lokal","LSM/Komunitas","Lainnya"
    ) 
  },
  stakeholder_other: { type: DataTypes.STRING(255) },
  relationship: { type: DataTypes.TEXT },
}, {
  tableName: "business_stakeholders",
  timestamps: false
});

module.exports = BusinessStakeholder;
