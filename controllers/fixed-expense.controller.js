const FixedExpense = require("../models/fixed-expense");
const CategoryExpense = require('../models/category-expense')
const { v4: uuidv4 } = require("uuid");


// create new fixed_expense
exports.create = async (req, res, next) => {
  try {
    const { title, money, note, repeat, startDate, endDate, categoryExpenseId } = req.body;
    const userId = req.user.dataValues.id;
    const fixed_expense = await FixedExpense.create({
      id:uuidv4(),
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      money,
      note,
      title,
      repeat,
      userId,
      categoryExpenseId,
    });

    res.status(200).json({
      message: "Created fixed_expense successfully!",
      fixed_expense,
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

// get all fixed_expenses
exports.getAll = async (req, res, next) => {
  try {
    const userId = req.user.dataValues.id;
    const fixed_expenses = await FixedExpense.findAll({
      where: { userId: userId },
      include: [{model: CategoryExpense, required: true}]
    });

    res.status(200).json(fixed_expenses);
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

// update fixed_expense
exports.update = async (req, res, next) => {
  try {
    const id = req.params.id;
    const fixed_expense = req.body;
    await FixedExpense.update(fixed_expense, {
      where: {
        id: id,
      },
    });

    res.status(200).json({
      message: "Update fixed_expense successfully!",
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

// delete fixed_expense
exports.delete = async (req, res, next) => {
  try {
    const id = req.params.id;
    await FixedExpense.destroy({
      where: {
        id: id,
      },
    });

    res.status(200).json({ message: "Delete fixed_expense successfully!" });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};
