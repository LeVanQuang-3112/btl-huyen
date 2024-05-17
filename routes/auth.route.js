const express = require("express");
const authController = require("../controllers/auth.controller");
const isAuth = require("../middlewares/is-auth");
const userService = express.Router();

// Login
userService.post("/login", authController.login);

// Signup
userService.post("/signup", authController.signup);

// Get profile
 userService.get("/user", isAuth, authController.getUser);

module.exports = userService;
