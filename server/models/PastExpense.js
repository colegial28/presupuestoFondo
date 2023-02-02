const Sequelize = require('sequelize');
const sequelize = require('../db');
const Agency = require('./Agency');
const Category = require('./category');


const PastExpense = sequelize.define('pastExpense', {
    amount: {
        type: Sequelize.FLOAT,
        allowNull: false,
    },
});

PastExpense.belongsTo(Category);
PastExpense.belongsTo(Agency);

module.exports = PastExpense;
