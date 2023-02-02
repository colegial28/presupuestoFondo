const Sequelize = require('sequelize');
const sequelize = require('../db');

const Category = sequelize.define('category', {
  name: {
    type: Sequelize.ENUM('Salaries', 'Equipment', 'Supplies', 'Services'),
    allowNull: false,
  },
  order: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

module.exports = Category;
