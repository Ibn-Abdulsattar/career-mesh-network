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
    field_of_study: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    modelName: "Education",
    tableName: "educations",
    underscored: true,
    indexes: [
      { fields: ["field_of_study"], name: "idx-education-field_of_study" },
    ],
  },
);

export default Education