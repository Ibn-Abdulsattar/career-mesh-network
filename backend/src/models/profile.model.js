import { Model, DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

class Profile extends Model {}

Profile.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.UUID,
      references: {
        model: "users",
        key: "user_id",
      },
      allowNull: false,
    },
    bio: {
      type: DataTypes.STRING,
    },
    currentPost: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    modelName: "Profile",
    tableName: "profiles",
    underscored: true,
    indexes: [
      { fields: ["id"], name: "idx-profile-id" },
      { fields: ["bio"], name: "idx-profile-bio" },
    ],
  },
);

export default Profile;
