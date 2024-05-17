const db = require("../../config/database");
const { DataTypes } = require("sequelize");

const FixedExpense = db.define(
  "fixed_expense",
  {
    id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
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
    repeat: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: false,
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

FixedExpense.sync({ alter: true })
  .then(() => console.log("Sync FixedExpense"))
  .catch((error) => console.log(error));
module.exports = FixedExpense;