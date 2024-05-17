const express = require("express");
const route = express.Router();
const isAuth = require("../middlewares/is-auth");
const expenseController = require("../controllers/expense.controller");

// get all expenses
route.get("/", isAuth, expenseController.getAll);
route.get("/detail/category/:id/year/:year", isAuth, expenseController.getAllExpense);

// update expense
route.put("/:id", isAuth, expenseController.update);

// create expense
route.post("/", isAuth, expenseController.create);

// delete expense
route.delete("/:id", isAuth, expenseController.delete);

module.exports = route;
