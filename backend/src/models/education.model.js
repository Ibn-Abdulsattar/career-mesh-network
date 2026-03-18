import { Model, DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

class Education extends Model {}

Education.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
        profile_id: {
        type: DataTypes.UUID,
        references:{
            model: "profiles",
            key: "id"
        }
    },
    school: {
      type: DataTypes.STRING,
    },
    degree: {
      type: DataTypes.STRING,
    },
    field: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    modelName: "Education",
    tableName: "educations",
    underscored: true,
    indexes: [
      { fields: ["field"], name: "idx-education-field" },
    ],
  },
);

export default Education