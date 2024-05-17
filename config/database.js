const { Sequelize } = require("sequelize");

require("dotenv/config");

module.exports = new Sequelize('demo2', 'root', 'Levanquang311201@', {
  host: '127.0.0.1',
  dialect: 'mysql',
  port: 3306
});
