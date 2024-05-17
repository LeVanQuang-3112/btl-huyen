const express = require("express");
const route = express.Router();
const isAuth = require("../middlewares/is-auth");
const categoryExpenseController = require("../controllers/category-expense.controller");

// get all category-expenses
route.get("/", isAuth, categoryExpenseController.getAll);
route.get("/dashboard/:year", isAuth, categoryExpenseController.getAllExpenseByUserAndCategory);
route.post("/", isAuth, categoryExpenseController.create);
route.put("/:id", isAuth, categoryExpenseController.update);
route.delete("/:id", isAuth, categoryExpenseController.delete);


module.exports = route;
