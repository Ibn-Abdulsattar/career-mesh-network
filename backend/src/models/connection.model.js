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
    sender_id: {
      type: DataTypes.UUID,
      references: {
        model: "users",
        key: "user_id",
      },
      allowNull: false,
    },
    reciver_id: {
      type: DataTypes.UUID,
      references: {
        model: "users",
        key: "user_id",
      },
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("accepted", "rejected", "pending"),
      defaultValue: "pending",
    },
  },
  {
    sequelize,
    modelName: "Connection",
    tableName: "connections",
    underscored: true,
    indexes: [
      { fields: ["sender_id"], name: "idx-sender_id" },
      { fields: ["reciver_id"], name: "idx-reciver_id" },
      { fields: ["status"], name: "idx-connection-status" },
    ],
  },
);

export default Connection;
