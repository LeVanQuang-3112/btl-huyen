const db = require("../../config/database");
const { DataTypes } = require("sequelize");

const Income = db.define(
  "income",
  {
    id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    money: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    note: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    userId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    categoryIncomeId: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  },
  { timestamps: false, freezeTableName: true }
);

Income.sync({ alter: true })
  .then(() => console.log("Sync Income"))
  .catch((error) => console.log(error));
module.exports = Income;