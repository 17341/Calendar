const Sequelize = require('sequelize')
const db = require('../db.js')

const Event = db.define('event', {
    event_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    start_at: {
        type: 'DATETIME',
        allowNull: false
    },
    end_at: {
        type: 'DATETIME',
        allowNull: false
    },
    description: { type: Sequelize.TEXT, allowNull: true },
    status: { type: Sequelize.STRING(30), allowNull: false }
})

module.exports = Event