const db = require("../../config/database");
const { DataTypes } = require("sequelize");

const CategoryExpense = db.define(
  "category_expense",
  {
    id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { timestamps: false, freezeTableName: true }
);

CategoryExpense.sync({ alter: true })
  .then(() => console.log("Sync CategoryExpense"))
  .catch((error) => console.log(error));
module.exports = CategoryExpense;