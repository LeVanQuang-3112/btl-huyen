const express = require("express");
const router = express.Router();

router.use("/auth", require("./auth.route"));
router.use('/income', require("./income.route"));
router.use('/expense', require("./expense.route"));
router.use('/fixed-income', require("./fixed-income.route"));
router.use('/fixed-expense', require("./fixed-expense.route"));
router.use('/category-income', require("./category-income.route"));
router.use('/category-expense', require("./category-expense.route"));

module.exports = router;
