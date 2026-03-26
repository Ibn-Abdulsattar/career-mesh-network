import { Model, DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

class Post extends Model {}

Post.init(
  {
    id:{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "users",
        key: "user_id",
      },
    },
    body: {
      type: DataTypes.JSONB,
    },
    likes: {
      type: DataTypes.INTEGER,
    },
    media: {
      type: DataTypes.STRING,
    },
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    fileType: {
      type: DataTypes.STRING,
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
