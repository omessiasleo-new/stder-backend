import { DataTypes, Model } from "sequelize";

import sequelize from "../config/database.js";

class Lead extends Model {}

Lead.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    document: {
      type: DataTypes.STRING(14),
      allowNull: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    password: {
      type: DataTypes.STRING(100),
      allowNull: true,
    }
  },
  {
    sequelize,
    modelName: "Lead",
  }
);

export default Lead;
