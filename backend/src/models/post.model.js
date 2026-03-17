import { Model, DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

class Post extends Model {}

Post.init(
  {
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "users",
        key: "user_id",
      },
    },
    body: {
      type: DataTypes.STRING,
    },
    likes: {
      type: DataTypes.FLOAT,
    },
    media: {
      type: DataTypes.STRING,
    },
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    fileType: {
      type: DataTypes.ENUM("text", "image", "video", "document"),
    },
  },
  {
    sequelize,
    modelName: "Post",
    tableName: "posts",
    underscored: true,
  },
);

export default Post;
