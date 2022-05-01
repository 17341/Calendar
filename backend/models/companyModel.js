const Sequelize = require('sequelize')
const db = require('../db.js')

const Company = db.define('company', {
    company_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: { type: Sequelize.STRING(30), allowNull: false },
    password: { type: Sequelize.STRING(30), allowNull: false }
})

module.exports = Company