import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

export const User = sequelize.define(
  "User",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING },
    email: { type: DataTypes.STRING },
  },
  { tableName: "users", timestamps: true }
);
