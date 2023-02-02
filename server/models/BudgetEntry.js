const Sequelize = require('sequelize');
const db = require('../db');
const Agency = require('./Agency');
const Category = require('./category');

const BudgetEntry = db.define('budgetEntry', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    description: {
        type: Sequelize.STRING,
        allowNull: false
    },
    amount: {
        type: Sequelize.FLOAT,
        allowNull: false
    },
    date: {
        type: Sequelize.DATE,
        allowNull: false
    },
    revisedDate: {
        type: Sequelize.DATE
    },
    status: {
        type: Sequelize.ENUM('pending', 'approved', 'denied'),
        allowNull: false
    }
});

BudgetEntry.belongsTo(Category);
BudgetEntry.belongsTo(Agency, { foreignKey: "agencyId" })

module.exports = BudgetEntry;