const db = require("../../config/database");
const { DataTypes } = require("sequelize");

const Expense = db.define(
  "expense",
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
    categoryExpenseId: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  },
  { timestamps: false, freezeTableName: true }
);

Expense.sync({ alter: true })
  .then(() => console.log("Sync Expense"))
  .catch((error) => console.log(error));
module.exports = Expense;