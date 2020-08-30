const Sequelize = require('sequelize')
const db = require('../db')

const Notification = db.define("notification", {
    notificationTitle: {
        type: Sequelize.TEXT,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    notificationBody: {
        type: Sequelize.TEXT,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    type: {
        type: Sequelize.ENUM(
            "memberRequest",
            "welcome",
            "newItem",
            "other"
        ),
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    unread: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true,
        validate: {
            notEmpty: true
        }
    }
});

module.exports = Notification;
