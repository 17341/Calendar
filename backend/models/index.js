const Sequelize = require('sequelize');
const sequelize = require('../db.js');
const db = {};

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.User = require('../models/userModel');
db.Event = require('../models/eventModel');
db.Exchange = require('../models/exchangeModel');
db.Company = require('../models/companyModel');

db.Company.hasMany(db.User, { foreignKey: "company_id" });
db.User.belongsTo(db.Company, { foreignKey: "company_id" });

db.Event.hasMany(db.Exchange, { foreignKey: "event_id" });
db.Exchange.belongsTo(db.Event, { foreignKey: "event_id" });

db.User.hasMany(db.Event, { foreignKey: "user_id" });
db.Event.belongsTo(db.User, { foreignKey: "user_id" });

db.Exchange.belongsTo(db.User, { foreignKey: "user_id" });

module.exports = db;
