const Expense = require("../models/expense");
const CategoryExpense = require("../models/category-expense");
const { v4: uuidv4 } = require("uuid");
const { Op } = require('sequelize');

// create new expense
exports.create = async (req, res, next) => {
  try {
    const { date, money, note, categoryExpenseId } = req.body;
    const userId = req.user.dataValues.id;
    const expense = await Expense.create({
      id: uuidv4(),
      date: new Date(date),
      money,
      note,
      userId,
      categoryExpenseId
    });

    res.status(200).json({
      message: "Created expense successfully!",
      expense,
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

// get all expenses
exports.getAll = async (req, res, next) => {
  try {
    const userId = req.user.dataValues.id;
    const expenses = await Expense.findAll({
      where: { userId: userId },
      include: [{ model: CategoryExpense, required: true, }]
    });

    res.status(200).json(expenses);
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.getAllExpense = async (req, res, next) => {
  try {
    const categoryId = req?.params?.id
    const userId = req.user.dataValues.id;
    const year = req.params.year || new Date().getFullYear();
    const nextYear = Math.round(Number(year) + 1)
    console.log(nextYear, 'next year')
    // const expenses = await Expense.findAll({
    //   where: { userId: userId, categoryExpenseId: categoryId },
    //   include: [{ model: CategoryExpense, required: true, }]
    // });

    const vnMonthNames = [
      "Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6",
      "Tháng 7", "Tháng 8", "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12"
    ];

    if (!userId) {
      return res.status(400).send('userId is required');
    }

    const category = await CategoryExpense.findOne({
      where: {
        id: categoryId,
        userId: userId, // lọc theo userId để đảm bảo người dùng có quyền truy cập vào category này
      },
    });

    if (!category) {
      return res.status(404).send('Category not found');
    }

    const expenses = await Expense.findAll({
      where: {
        categoryExpenseId: categoryId,
        userId: userId, // lọc theo userId để lấy các expense của người dùng đó
        date: {
          [Op.gte]: new Date(`${year}-01-01`),
          [Op.lt]: new Date(`${nextYear}-01-01`),
        },
      },
    });

    console.log(expenses, 'expenses')

    // Nhóm chi phí theo tháng
    const monthlyExpenses = Array.from({ length: 12 }, (_, index) => ({
      month: index + 1,
      totalExpense: 0,
      nameMonth: vnMonthNames[index],
    }));

    expenses.forEach(expense => {
      const month = new Date(expense.date).getMonth(); // lấy tháng (0-11)
      monthlyExpenses[month].totalExpense += expense.money;
    });

    res.status(200).json(monthlyExpenses);
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  };

};

// update expense
exports.update = async (req, res, next) => {
  try {
    const id = req.params.id;
    const expense = req.body;
    await Expense.update(expense, {
      where: {
        id: id,
      },
    });

    res.status(200).json({
      message: "Update expense successfully!",
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

// delete expense
exports.delete = async (req, res, next) => {
  try {
    const id = req.params.id;
    await Expense.destroy({
      where: {
        id: id,
      },
    });

    res.status(200).json({ message: "Delete expense successfully!" });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};
