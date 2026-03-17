import Comment from "./comment.model";
import Connection from "./connection.model";
import Education from "./education.model";
import Experience from "./experience.model";
import Post from "./post.model";
import Profile from "./profile.model";
import User from "./user.model";

// Post & Comment
User.hasMany(Post, {
  foreignKey: "user_id",
  as: "posts",
  onDelete: "CASCADE",
  hooks: true,
});
Post.belongsTo(User, { foreignKey: "user_id", as: "user" });

User.hasMany(Comment, {
  foreignKey: "user_id",
  as: "comments",
  onDelete: "CASCADE",
  hooks: true,
});
Comment.belongsTo(User, { foreignKey: "user_id", as: "user" });

// Profile
User.hasOne(Profile, {
  foreignKey: "user_id",
  as: "profile",
  onDelete: "CASCADE",
  hooks: true,
});
Profile.belongsTo(User, { foreignKey: "user_id", as: "user" });

Profile.hasMany(Experience, {
  foreignKey: "profile_id",
  as: "experiences",
  onDelete: "CASCADE",
  hooks: true,
});
Experience.belongsTo(Profile, { foreignKey: "profile_id", as: "profile" });

Profile.hasMany(Education, {
  foreignKey: "profile_id",
  as: "educations",
  onDelete: "CASCADE",
  hooks: true,
});
Education.belongsTo(Profile, { foreignKey: "profile_id", as: "profile" });

// Connections
User.hasMany(Connection, {
  foreignKey: "user_id",
  as: "sentConnections",
  onDelete: "CASCADE",
  hooks: true,
});
Connection.belongsTo(User, { foreignKey: "user_id", as: "sender" });

User.hasMany(Connection, {
  foreignKey: "user_id",
  as: "recievedConnections",
  onDelete: "CASCADE",
  hooks: true,
});
Connection.belongsTo(User, { foreignKey: "user_id", as: "reciever" });

export { Comment, Connection, Education, Experience, Post, Profile, User };
