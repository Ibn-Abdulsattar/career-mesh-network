import { Model, DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

class Experience extends Model {}

Experience.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    profile_id: {
      type: DataTypes.UUID,
      references: {
        model: "profiles",
        key: "id",
      },
    },
    company: {
      type: DataTypes.STRING,
    },
    position: {
      type: DataTypes.STRING,
    },
    years: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    modelName: "Experience",
    tableName: "experiences",
    underscored: true,
    indexes: [{ fields: ["position"], name: "idx-experience-position" }],
  },
);

export default Experience;
