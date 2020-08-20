const Sequelize = require('sequelize')
const db = require('../db')

const Notification = db.define("notification", {});

module.exports = Notification;