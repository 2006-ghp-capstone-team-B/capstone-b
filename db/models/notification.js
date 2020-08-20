const Sequelize = require('sequelize')
const db = require('../db')

const Notification = db.define("notification", {
    notification: {
        type: Sequelize.TEXT,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
});

module.exports = Notification;