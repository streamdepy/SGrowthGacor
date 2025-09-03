const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const BusinessProfile = sequelize.define("BusinessProfile", {
  id: { type: DataTypes.STRING, primaryKey: true },
  user_id: { type: DataTypes.INTEGER, allowNull: false },

  business_name: { type: DataTypes.STRING(180), allowNull: false },
  established_year: { type: DataTypes.INTEGER },
  legal_form: { type: DataTypes.STRING(120) },

  industry_type: { 
    type: DataTypes.ENUM("Manufaktur", "Jasa", "Perdagangan", "Pertanian/Perikanan", "Teknologi", "Lainnya") 
  },
  headquarters: { type: DataTypes.STRING(255) },
  city: { type: DataTypes.STRING(100) },
  province: { type: DataTypes.STRING(100) },
  products_offered: { type: DataTypes.TEXT },

  ownership_percentage: { type: DataTypes.DECIMAL(5,2) },

  market_scope: { 
    type: DataTypes.ENUM("Lokal","Nasional","Regional (ASEAN)","Global") 
  },
  target_market: { 
    type: DataTypes.ENUM("B2B","B2C","Pemerintah","Lainnya") 
  },
  target_market_other: { type: DataTypes.STRING(255) },

  total_employees_fulltime: { type: DataTypes.INTEGER },
  total_employees_parttime: { type: DataTypes.INTEGER },
  male_percentage: { type: DataTypes.DECIMAL(5,2) },
  female_percentage: { type: DataTypes.DECIMAL(5,2) },

  core_values: { type: DataTypes.TEXT },
  ethics_principles: { type: DataTypes.TEXT },

  pic_name: { type: DataTypes.STRING(120) },
  pic_position: { type: DataTypes.STRING(120) },
  pic_phone: { type: DataTypes.STRING(50) },
  pic_email: { type: DataTypes.STRING(120) },
  supporting_documents: { type: DataTypes.TEXT },

  created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
}, {
  tableName: "business_profiles",
  timestamps: false
});

module.exports = BusinessProfile;
