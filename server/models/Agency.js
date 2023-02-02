const Sequelize = require('sequelize');
const db = require('../db');

const Agency = db.define('Agency', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    }
});


module.exports = Agency;