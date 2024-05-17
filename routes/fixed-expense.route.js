const express = require("express");
const route = express.Router();
const isAuth = require("../middlewares/is-auth");
const fixedExpenseController = require("../controllers/fixed-expense.controller");

// get all expenses
route.get("/", isAuth, fixedExpenseController.getAll);

// update expense
route.put("/:id", isAuth, fixedExpenseController.update);

// create expense
route.post("/", isAuth, fixedExpenseController.create);

// delete expense
route.delete("/:id", isAuth, fixedExpenseController.delete);

module.exports = route;
