const Sequelize = require('sequelize');
const sequelize = require('../db');
const Agency = require('./Agency');

const User = sequelize.define('user', {
    email: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    type: {
        type: Sequelize.ENUM('normal', 'director'),
        allowNull: false,
    }
});

User.belongsTo(Agency, { foreignKey: "agencyId" })

module.exports = User;
