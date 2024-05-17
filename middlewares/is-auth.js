require("dotenv/config");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

module.exports = async (req, res, next) => {
  try {
    const authHeader = req.get("Authorization");
    if (!authHeader) {
      const error = new Error("Not authenticated");
      error.statusCode = 401;
      throw error;
    }

    const token = authHeader.split(" ")[1];

    let decodedToken;

    try {
      decodedToken = jwt.verify(token, 'akjsdkajkjkj-13123-12-3123iiashdlahd=');
    } catch (err) {
      const error = new Error(err.message);
      error.statusCode = 401;
      throw error;
    }

    if (!decodedToken) {
      const error = new Error("Not authenticated");
      error.statusCode = 401;
      throw error;
    }

    const user = await User.findOne({ where: { id: decodedToken.userId } });
    req.user = user;
    next();
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};
