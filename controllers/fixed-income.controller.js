const FixedIncome = require("../models/fixed-income");
const CategoryIncome = require('../models/category-income')
const { v4: uuidv4 } = require("uuid");

// create new fixed_income
exports.create = async (req, res, next) => {
  try {
    const { title, money, note, repeat, startDate, endDate, categoryIncomeId } = req.body;
    const userId = req.user.dataValues.id;
    const fixed_income = await FixedIncome.create({
      id:  uuidv4(),
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      money,
      note,
      title,
      repeat,
      userId,
      categoryIncomeId
    });

    res.status(200).json({
      message: "Created fixed_income successfully!",
      fixed_income,
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

// get all fixed_incomes
exports.getAll = async (req, res, next) => {
  try {
    const userId = req.user.dataValues.id;
    const fixed_incomes = await FixedIncome.findAll({
      where: { userId: userId },
      include: [{model: CategoryIncome, required: true}]
    });

    res.status(200).json(fixed_incomes);
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

// update fixed_income
exports.update = async (req, res, next) => {
  try {
    const id = req.params.id;
    const fixed_income = req.body;
    await FixedIncome.update(fixed_income, {
      where: {
        id: id,
      },
    });

    res.status(200).json({
      message: "Update fixed_income successfully!",
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

// delete fixed_income
exports.delete = async (req, res, next) => {
  try {
    const id = req.params.id;
    await FixedIncome.destroy({
      where: {
        id: id,
      },
    });

    res.status(200).json({ message: "Delete fixed_income successfully!" });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};
