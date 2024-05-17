const express = require("express");
const route = express.Router();
const isAuth = require("../middlewares/is-auth");
const categoryIncomeController = require("../controllers/category-income.controller");

// get all category-incomes
route.get("/", isAuth, categoryIncomeController.getAll);
route.get("/dashboard/:year", isAuth, categoryIncomeController.getIncomeByUserAndCategory);
route.put("/:id", isAuth, categoryIncomeController.update);
route.delete("/:id", isAuth, categoryIncomeController.delete);

module.exports = route;
