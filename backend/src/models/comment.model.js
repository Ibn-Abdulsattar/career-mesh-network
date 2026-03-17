import { Model, DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

class Comment extends Model {}

Comment.init(
  {
    user_id: {
      type: DataTypes.UUID,
      references: {
        model: "User",
        key: "user_id",
      },
      allowNull: false,
    },
    post_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    body: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    modelName: "Comment",
    tableName: "comments",
    underscored: true,
    indexes: [
      { fields: ["post_id"], name: "idx-post_id" },
    ],
  },
);

export default Comment;
