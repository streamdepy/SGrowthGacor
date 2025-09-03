const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const BusinessDepartment = sequelize.define("BusinessDepartment", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  business_id: { type: DataTypes.STRING, allowNull: false },
  department_name: { type: DataTypes.STRING(100), allowNull: false },
  employee_count: { type: DataTypes.INTEGER },
}, {
  tableName: "business_departments",
  timestamps: false
});

module.exports = BusinessDepartment;
