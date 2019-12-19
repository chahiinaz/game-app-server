const Sequelize = require("sequelize");
const db = require("../db");

const User = db.define("user", {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  },
  choice: {
    type: Sequelize.BOOLEAN
  },
  points: {
    type: Sequelize.INTEGER
  }
});

module.exports = User;
