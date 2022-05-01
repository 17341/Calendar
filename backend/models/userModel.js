const Sequelize = require('sequelize')
const db = require('../db.js')

const User = db.define('user', {
    user_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    last_name: { type: Sequelize.STRING(30), allowNull: false },
    first_name: { type: Sequelize.STRING(30), allowNull: false },
    email: { type: Sequelize.STRING(30), allowNull: false },
    password: { type: Sequelize.STRING(30), allowNull: false },
    role: { type: Sequelize.STRING(30), allowNull: false }
})

module.exports = User