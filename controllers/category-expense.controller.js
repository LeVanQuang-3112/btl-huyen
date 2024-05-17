const { v4: uuidv4 } = require("uuid");
const CategoryExpense = require("../models/category-expense");
const Expense = require("../models/expense");
const { Sequelize, DataTypes } = require('sequelize');
// const sequelize = require('../config/database')
const sequelize = new Sequelize('demo2', 'root', 'Levanquang311201@', {
  host: '127.0.0.1',
  dialect: 'mysql',
  port: 3306
});
const { Op } = require('sequelize');


// get all category_expense
exports.getAll = async (req, res, next) => {
  try {
    const userId = req.user.dataValues.id;
    const category_expenses = await CategoryExpense.findAll({
      where: { userId: userId },
    });

    res.status(200).json(category_expenses);
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.getAllExpenseByUserAndCategory = async (req, res, next) => {
  try {
    const userId = req.user.dataValues.id;
    const year = req.params.year;
    const categories = await CategoryExpense.findAll({
      where: {
        userId,
      },
      include: [
        {
          model: Expense,
          where: sequelize.where(sequelize.fn('YEAR', sequelize.col('date')), year),
          attributes: [],
        },
      ],
      attributes: [
        'content',
        [sequelize.fn('SUM', sequelize.col('Expenses.money')), 'totalMoney'],
        'id',
      ],
      group: ['category_expense.id'],
    });

    res.json(categories);
    // res.status(200).json(category_expenses);
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

// create new expense
exports.create = async (req, res, next) => {
  try {
    const { content } = req.body;
    console.log(content, 'content')
    const userId = req.user.dataValues.id;
    await CategoryExpense.create({
      id: uuidv4(),
      userId, content
    });

    console.log('created')
    res.status(200).json({
      message: "Created category expense successfully!",
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.update = async (req, res, next) => {
  try {
    const id = req.params.id;
    const categoryExpense = req.body;
    await CategoryExpense.update(categoryExpense, {
      where: {
        id: id,
      },
    });

    res.status(200).json({
      message: "Update category expense successfully!",
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.delete = async (req, res, next) => {
  try {
    const id = req.params.id;
    await CategoryExpense.destroy({
      where: {
        id: id,
      },
    });

    res.status(200).json({ message: "Delete category expense successfully!" });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};
