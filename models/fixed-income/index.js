const db = require("../../config/database");
const { DataTypes } = require("sequelize");

const FixedIncome = db.define(
  "fixed-income",
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
    categoryIncomeId: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  },
  { timestamps: false, freezeTableName: true }
);

FixedIncome.sync({ alter: true })
  .then(() => console.log("Sync FixedIncome"))
  .catch((error) => console.log(error));
module.exports = FixedIncome;