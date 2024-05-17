const { v4: uuidv4 } = require("uuid");
const Income = require("../models/income");
const CategoryIncome = require("../models/category-income");
const { Op } = require("sequelize");

// create new income
exports.create = async (req, res, next) => {
  try {
    const { date, money, note, categoryIncomeId } = req.body;
    const userId = req.user.dataValues.id;
    const income = await Income.create({
      id: uuidv4(),
      date: new Date(date),
      money,
      note,
      userId,
      categoryIncomeId,
    });

    res.status(200).json({
      message: "Created income successfully!",
      income,
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

// get all incomes
exports.getAll = async (req, res, next) => {
  try {
    const userId = req.user.dataValues.id;
    const incomes = await Income.findAll({
      where: { userId: userId },
      include: [{ model: CategoryIncome, required: true }]
    });

    res.status(200).json(incomes);
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};


exports.getAllIncomeUser = async (req, res, next) => {
  try {
    const categoryId = req?.params?.id
    const userId = req.user.dataValues.id;
    const year = req.params.year || new Date().getFullYear();
    const nextYear = Math.round(Number(year) + 1)
    console.log(categoryId, 'categoryId')
    const vnMonthNames = [
      "Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6",
      "Tháng 7", "Tháng 8", "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12"
    ];

    if (!userId) {
      return res.status(400).send('userId is required');
    }

    const category = await CategoryIncome.findOne({
      where: {
        id: categoryId,
        userId: userId, // lọc theo userId để đảm bảo người dùng có quyền truy cập vào category này
      },
    });

    if (!category) {
      return res.status(404).send('Category not found');
    }

    const income = await Income.findAll({
      where: {
        categoryIncomeId: categoryId,
        userId: userId, // lọc theo userId để lấy các expense của người dùng đó
        date: {
          [Op.gte]: new Date(`${year}-01-01`),
          [Op.lt]: new Date(`${nextYear}-01-01`),
        },
      },
    });

    console.log(income, 'income')


    // Nhóm chi phí theo tháng
    const monthlyIncome = Array.from({ length: 12 }, (_, index) => ({
      month: index + 1,
      totalIncome: 0,
      nameMonth: vnMonthNames[index],
    }));

    income.forEach(expense => {
      const month = new Date(expense.date).getMonth(); // lấy tháng (0-11)
      monthlyIncome[month].totalIncome += expense.money;
    });

    res.status(200).json(monthlyIncome);
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  };

};

// update income
exports.update = async (req, res, next) => {
  try {
    const id = req.params.id;
    const income = req.body;
    await Income.update(income, {
      where: {
        id: id,
      },
    });

    res.status(200).json({
      message: "Update income successfully!",
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

// delete income
exports.delete = async (req, res, next) => {
  try {
    const id = req.params.id;
    await Income.destroy({
      where: {
        id: id,
      },
    });

    res.status(200).json({ message: "Delete income successfully!" });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};
