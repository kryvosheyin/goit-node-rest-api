import { DataTypes } from "sequelize";
import sequelize from "../Sequelize.js";

const User = sequelize.define("user", {
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  subscription: {
    type: DataTypes.ENUM,
    values: ["starter", "pro", "business"],
    defaultValue: "starter",
  },
  avatarURL: {
    type: DataTypes.STRING,
  },
  verify: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  verificationToken: {
    type: DataTypes.STRING,
  },
  token: {
    type: DataTypes.STRING,
    defaultValue: null,
  },
});

// User.sync({ force: true });

export default User;
