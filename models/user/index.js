const { DataTypes } = require("sequelize");
const db = require("../../config/database");
const Income = require("../income");
const Expense = require("../expense");
const FixedIncome = require("../fixed-income");
const FixedExpense = require("../fixed-expense");
const CategoryIncome = require("../category-income");
const CategoryExpense = require("../category-expense");

const User = db.define(
  "user",
  {
    id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { timestamps: false, freezeTableName: true }
);

// Associate User - Income (1-n)
User.hasMany(Income);
Income.belongsTo(User);

// Associate User - Expense (1-n)
User.hasMany(Expense);
Expense.belongsTo(User);

// Associate User - FixedIncome (1-n)
User.hasMany(FixedIncome);
FixedIncome.belongsTo(User);

// Associate User - FixedExpense (1-n)
User.hasMany(FixedExpense);
FixedExpense.belongsTo(User);

// Associate User - CategoryIncome (1-n)
User.hasMany(CategoryIncome);
CategoryIncome.belongsTo(User);

// Associate User - CategoryExpense (1-n)
User.hasMany(CategoryExpense);
CategoryExpense.belongsTo(User);

// Associate CategoryIncome - Income (1-n)
CategoryIncome.hasMany(Income);
Income.belongsTo(CategoryIncome);

// Associate CategoryExpense - Expense (1-n)
CategoryExpense.hasMany(Expense);
Expense.belongsTo(CategoryExpense);

// Associate CategoryIncome - FixedIncome (1-n)
CategoryIncome.hasMany(FixedIncome);
FixedIncome.belongsTo(CategoryIncome);

// Associate CategoryExpense - FixedExpense (1-n)
CategoryExpense.hasMany(FixedExpense);
FixedExpense.belongsTo(CategoryExpense);

// Sync models
User.sync({ alter: true })
  .then(() => console.log("Sync User"))
  .then(() => CategoryIncome.sync({ alter: true }))
  .then(() => console.log("Sync CategoryIncome"))
  .then(() => CategoryExpense.sync({ alter: true }))
  .then(() => console.log("Sync CategoryExpense"))
  .then(() => Income.sync({ alter: true }))
  .then(() => console.log("Sync Income"))
  .then(() => Expense.sync({ alter: true }))
  .then(() => console.log("Sync Expense"))
  .then(() => FixedIncome.sync({ alter: true }))
  .then(() => console.log("Sync FixedIncome"))
  .then(() => FixedExpense.sync({ alter: true }))
  .then(() => console.log("Sync FixedExpense"))
  .catch((error) => console.log(error));

module.exports = User;
