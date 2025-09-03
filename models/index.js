const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.json")[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

// Import semua models
fs.readdirSync(__dirname)
  .filter((file) => file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js")
  .forEach((file) => {
    const model = require(path.join(__dirname, file));
    const modelName = model.name || path.basename(file, ".js"); // fallback nama file
    db[modelName] = model;
  });

console.log("✅ Loaded models:", Object.keys(db)); // Debugging

// ================== RELASI ================== //

// User ↔ BusinessProfile
if (db.User && db.BusinessProfile) {
  db.User.hasMany(db.BusinessProfile, { foreignKey: "user_id" });
  db.BusinessProfile.belongsTo(db.User, { foreignKey: "user_id" });
}

// BusinessProfile ↔ ESGScore
if (db.BusinessProfile && db.ESGScore) {
  db.BusinessProfile.hasMany(db.ESGScore, { foreignKey: "business_id" });
  db.ESGScore.belongsTo(db.BusinessProfile, { foreignKey: "business_id" });
}

// BusinessProfile ↔ GRISubmission
if (db.BusinessProfile && db.GRISubmission) {
  db.BusinessProfile.hasMany(db.GRISubmission, { foreignKey: "business_id" });
  db.GRISubmission.belongsTo(db.BusinessProfile, { foreignKey: "business_id" });
}

// GRISubmission ↔ SupportingDocument
if (db.GRISubmission && db.SupportingDocument) {
  db.GRISubmission.hasMany(db.SupportingDocument, { foreignKey: "submission_id" });
  db.SupportingDocument.belongsTo(db.GRISubmission, { foreignKey: "submission_id" });
}

// GRISubmission ↔ ValidationResult
if (db.GRISubmission && db.ValidationResult) {
  db.GRISubmission.hasMany(db.ValidationResult, { foreignKey: "submission_id" });
  db.ValidationResult.belongsTo(db.GRISubmission, { foreignKey: "submission_id" });
}

// BusinessProfile ↔ Booking
if (db.BusinessProfile && db.Booking) {
  db.BusinessProfile.hasMany(db.Booking, { foreignKey: "business_id" });
  db.Booking.belongsTo(db.BusinessProfile, { foreignKey: "business_id" });
}

// AuditorProfile ↔ Booking
if (db.AuditorProfile && db.Booking) {
  db.AuditorProfile.hasMany(db.Booking, { foreignKey: "auditor_id" });
  db.Booking.belongsTo(db.AuditorProfile, { foreignKey: "auditor_id" });
}

// Booking ↔ Payment
if (db.Booking && db.Payment) {
  db.Booking.hasOne(db.Payment, { foreignKey: "booking_id" });
  db.Payment.belongsTo(db.Booking, { foreignKey: "booking_id" });
}

// BusinessProfile ↔ Certificate
if (db.BusinessProfile && db.Certificate) {
  db.BusinessProfile.hasMany(db.Certificate, { foreignKey: "business_id" });
  db.Certificate.belongsTo(db.BusinessProfile, { foreignKey: "business_id" });
}

// Certificate ↔ BlockchainHash
if (db.Certificate && db.BlockchainHash) {
  db.Certificate.hasMany(db.BlockchainHash, { foreignKey: "certificate_id" });
  db.BlockchainHash.belongsTo(db.Certificate, { foreignKey: "certificate_id" });
}

// BusinessProfile 1:N Shareholders
db.BusinessProfile.hasMany(db.BusinessShareholder, { foreignKey: "business_id" });
db.BusinessShareholder.belongsTo(db.BusinessProfile, { foreignKey: "business_id" });

// db.BusinessProfile 1:N Departments
db.BusinessProfile.hasMany(db.BusinessDepartment, { foreignKey: "business_id" });
db.BusinessDepartment.belongsTo(db.BusinessProfile, { foreignKey: "business_id" });

// db.BusinessProfile 1:N Certifications
db.BusinessProfile.hasMany(db.BusinessCertification, { foreignKey: "business_id" });
db.BusinessCertification.belongsTo(db.BusinessProfile, { foreignKey: "business_id" });

// db.BusinessProfile 1:N Stakeholders
db.BusinessProfile.hasMany(db.BusinessStakeholder, { foreignKey: "business_id" });
db.BusinessStakeholder.belongsTo(db.BusinessProfile, { foreignKey: "business_id" });

// ============================================ //

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
