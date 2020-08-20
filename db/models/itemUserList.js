const Sequelize = require('sequelize')
const db = require('../db')

const ItemUserList = db.define("itemUserList", {
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
    // itemId: {
    //     type: Sequelize.INTEGER,
    //     allowNull: false,
    //     validate: {
    //         notEmpty: true
    //     }
    // },
    quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
});

module.exports = ItemUserList;