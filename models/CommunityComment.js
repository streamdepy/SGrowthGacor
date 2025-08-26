const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const CommunityPost = require("./CommunityPost");
const User = require("./user");

const CommunityComment = sequelize.define("CommunityComment", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  post_id: { type: DataTypes.INTEGER, allowNull: false },
  author_user_id: { type: DataTypes.INTEGER, allowNull: false },
  content: { type: DataTypes.TEXT, allowNull: false },
  created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
}, {
  tableName: "community_comments",
  timestamps: false
});

CommunityPost.hasMany(CommunityComment, { foreignKey: "post_id" });
CommunityComment.belongsTo(CommunityPost, { foreignKey: "post_id" });

User.hasMany(CommunityComment, { foreignKey: "author_user_id" });
CommunityComment.belongsTo(User, { foreignKey: "author_user_id" });

module.exports = CommunityComment;
