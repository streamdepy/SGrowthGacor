const { Sequelize } = require("sequelize");
const sequelize = require("../config/database");

// Import semua models
const User = require("./user");
const BusinessProfile = require("./BusinessProfile");
const AuditorProfile = require("./AuditorProfile");
const AuditorPortfolio = require("./AuditorPortfolio");
const GRISubmission = require("./GRISubmission");
const SupportingDocument = require("./SupportingDocument");
const ValidationResult = require("./ValidationResult");
const ESGScore = require("./ESGScore");
const ChatLog = require("./ChatLog");
const Certificate = require("./Certificate");
const BlockchainHash = require("./BlockchainHash");
const Booking = require("./Booking");
const BookingMessage = require("./BookingMessage");
const Payment = require("./Payment");
const CommunityPost = require("./CommunityPost");
const CommunityComment = require("./CommunityComment");

// Register relasi antar models
function setupAssociations() {
  // === User Relations ===
  User.hasMany(BusinessProfile, { foreignKey: "user_id" });
  BusinessProfile.belongsTo(User, { foreignKey: "user_id" });

  User.hasMany(AuditorProfile, { foreignKey: "user_id" });
  AuditorProfile.belongsTo(User, { foreignKey: "user_id" });

  User.hasMany(ChatLog, { foreignKey: "user_id" });
  ChatLog.belongsTo(User, { foreignKey: "user_id" });

  User.hasMany(ValidationResult, { foreignKey: "validator_user_id" });
  ValidationResult.belongsTo(User, { foreignKey: "validator_user_id" });

  User.hasMany(BookingMessage, { foreignKey: "sender_user_id" });
  BookingMessage.belongsTo(User, { foreignKey: "sender_user_id" });

  User.hasMany(CommunityPost, { foreignKey: "author_user_id" });
  CommunityPost.belongsTo(User, { foreignKey: "author_user_id" });

  User.hasMany(CommunityComment, { foreignKey: "author_user_id" });
  CommunityComment.belongsTo(User, { foreignKey: "author_user_id" });

  // === Business Profile Relations ===
  BusinessProfile.hasMany(GRISubmission, { foreignKey: "business_id" });
  GRISubmission.belongsTo(BusinessProfile, { foreignKey: "business_id" });

  BusinessProfile.hasMany(ESGScore, { foreignKey: "business_id" });
  ESGScore.belongsTo(BusinessProfile, { foreignKey: "business_id" });

  BusinessProfile.hasMany(Certificate, { foreignKey: "business_id" });
  Certificate.belongsTo(BusinessProfile, { foreignKey: "business_id" });

  BusinessProfile.hasMany(Booking, { foreignKey: "business_id" });
  Booking.belongsTo(BusinessProfile, { foreignKey: "business_id" });

  // === Auditor Profile Relations ===
  AuditorProfile.hasMany(AuditorPortfolio, { foreignKey: "auditor_id" });
  AuditorPortfolio.belongsTo(AuditorProfile, { foreignKey: "auditor_id" });

  AuditorProfile.hasMany(Booking, { foreignKey: "auditor_id" });
  Booking.belongsTo(AuditorProfile, { foreignKey: "auditor_id" });

  // === GRI Submissions Relations ===
  GRISubmission.hasMany(SupportingDocument, { foreignKey: "submission_id" });
  SupportingDocument.belongsTo(GRISubmission, { foreignKey: "submission_id" });

  GRISubmission.hasMany(ValidationResult, { foreignKey: "submission_id" });
  ValidationResult.belongsTo(GRISubmission, { foreignKey: "submission_id" });

  // === Certificate & Blockchain ===
  Certificate.hasMany(BlockchainHash, { foreignKey: "certificate_id" });
  BlockchainHash.belongsTo(Certificate, { foreignKey: "certificate_id" });

  // === Booking Relations ===
  Booking.hasMany(BookingMessage, { foreignKey: "booking_id" });
  BookingMessage.belongsTo(Booking, { foreignKey: "booking_id" });

  Booking.hasOne(Payment, { foreignKey: "booking_id" });
  Payment.belongsTo(Booking, { foreignKey: "booking_id" });

  // === Community Relations ===
  CommunityPost.hasMany(CommunityComment, { foreignKey: "post_id" });
  CommunityComment.belongsTo(CommunityPost, { foreignKey: "post_id" });
}

// Setup all associations
setupAssociations();

module.exports = {
  sequelize,
  User,
  BusinessProfile,
  AuditorProfile,
  AuditorPortfolio,
  GRISubmission,
  SupportingDocument,
  ValidationResult,
  ESGScore,
  ChatLog,
  Certificate,
  BlockchainHash,
  Booking,
  BookingMessage,
  Payment,
  CommunityPost,
  CommunityComment
};
