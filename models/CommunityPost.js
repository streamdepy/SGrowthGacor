const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const User = require("./user");

const CommunityPost = sequelize.define("CommunityPost", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  author_user_id: { type: DataTypes.INTEGER, allowNull: false },
  title: { type: DataTypes.STRING(200), allowNull: false },
  content: { type: DataTypes.TEXT("medium"), allowNull: false },
  created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
}, {
  tableName: "community_posts",
  timestamps: false
});

User.hasMany(CommunityPost, { foreignKey: "author_user_id" });
CommunityPost.belongsTo(User, { foreignKey: "author_user_id" });

module.exports = CommunityPost;
