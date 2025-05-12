const { Sequelize } = require("sequelize");
const initModels = require("../models/init-models");
require("dotenv").config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "postgres",
    logging: false,
  }
);

const models = initModels(sequelize);

module.exports = { sequelize, models };
