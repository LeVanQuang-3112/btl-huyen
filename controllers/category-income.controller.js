const sequelize = require("../config/database");
const CategoryIncome = require("../models/category-income");
const Income = require("../models/income");

// get all category_income
exports.getAll = async (req, res, next) => {
  try {
    const userId = req.user.dataValues.id;

    const category_incomes = await CategoryIncome.findAll({
      where: { userId: userId },
    });

    res.status(200).json(category_incomes);
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.getIncomeByUserAndCategory = async (req, res, next) => {
  try {
    const userId = req.user.dataValues.id;
    const year = req.params.year;
    const categories = await CategoryIncome.findAll({
      where: { userId },
      include: [
        {
          model: Income,
          where: sequelize.where(sequelize.fn('YEAR', sequelize.col('date')), year),
          attributes: [],
        },
      ],
      attributes: [
        'content',
        [sequelize.fn('SUM', sequelize.col('Incomes.money')), 'totalMoney'],
        'id'
      ],
      group: ['category_income.id'],
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

exports.update = async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = req.body;
    await CategoryIncome.update(data, {
      where: {
        id: id,
      },
    });

    res.status(200).json({
      message: "Update category income successfully!",
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
    await CategoryIncome.destroy({
      where: {
        id: id,
      },
    });

    res.status(200).json({ message: "Delete category income successfully!" });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};
