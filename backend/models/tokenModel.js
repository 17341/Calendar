const Sequelize = require('sequelize')
const db = require('../db.js')

const Token = db.define('token', {
    token_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    email: { type: Sequelize.STRING(30), allowNull: false },
    refreshToken: { type: Sequelize.STRING(255), allowNull: false }
})

module.exports = Token