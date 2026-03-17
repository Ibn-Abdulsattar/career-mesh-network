import { Model, DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

class Connection extends Model {}

Connection.init(
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
    connection_id: {
      type: DataTypes.UUID,
      references: {
        model: "users",
        key: "user_id",
      },
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("accepted", "rejected", "pending", "blocked"),
    },
  },
  {
    sequelize,
    modelName: "Connection",
    tableName: "connections",
    underscored: true,
    indexes: [
      { fields: ["connection_id"], name: "idx-connection_id" },
      { fields: ["status"], name: "idx-connection-status" },
    ],
  },
);


export default Connection ;
