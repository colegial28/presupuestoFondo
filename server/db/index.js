const Sequelize = require("sequelize");

const sequelize = new Sequelize(
  "heroku_18e2c568674c5a5",
  "bc7e9681eb1d15",
  "22e51c5e",
  {
    host: "us-cdbr-east-06.cleardb.net",
    dialect: "mysql",
    logging: false,
  }
);

module.exports = sequelize;

// mysql://b9acfaf744881b:a4bd1b6e@us-cdbr-east-06.cleardb.net/heroku_13190350a4b1769?reconnect=true
