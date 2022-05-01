const config = require('./config/config.json');

const currentConfig = config.development;

const Sequelize = require('sequelize');

const sequelize = new Sequelize(
    currentConfig.database,
    currentConfig.username,
    currentConfig.password, {
    'dialect': currentConfig.dialect,
    'host': currentConfig.host
}
);

module.exports = sequelize