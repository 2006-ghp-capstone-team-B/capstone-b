const Sequelize = require('sequelize')
const db = require('../db')

const ListAccess = db.define("listAccess", {
    // userId: {
    //     type: Sequelize.INTEGER,
    //     allowNull: false,
    //     validate: {
    //         notEmpty: true
    //     }
    // },
    // listId: {
    //     type: Sequelize.INTEGER,
    //     allowNull: false,
    //     validate: {
    //         notEmpty: true
    //     }
    // },
    category: {
        type: Sequelize.ENUM(
            "private",
            "household"
        ),
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
});

module.exports = ListAccess;