const express = require("express");
const route = express.Router();
const isAuth = require("../middlewares/is-auth");
const fixedIncomeController = require("../controllers/fixed-income.controller");

// get all fixed-incomes
route.get("/", isAuth, fixedIncomeController.getAll);

// update fixed-income
route.put("/:id", isAuth, fixedIncomeController.update);

// create fixed-income
route.post("/", isAuth, fixedIncomeController.create);

// delete fixed-income
route.delete("/:id", isAuth, fixedIncomeController.delete);

module.exports = route;
