const db = require("../../config/database");
const { DataTypes } = require("sequelize");

const CategoryIncome = db.define(
  "category_income",
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

CategoryIncome.sync({ alter: true })
  .then(() => console.log("Sync CategoryIncome"))
  .catch((error) => console.log(error));
module.exports = CategoryIncome;