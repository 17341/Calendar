const Sequelize = require('sequelize')
const db = require('../db.js')

const Exchange = db.define('exchange', {
    exchange_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    status: { type: Sequelize.STRING(30), allowNull: false }
})

module.exports = Exchange