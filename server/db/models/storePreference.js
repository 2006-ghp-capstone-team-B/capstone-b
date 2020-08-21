const Sequelize = require('sequelize')
const db = require('../db')

const StorePreference = db.define("storePreference", {
    // userId: {
    //     type: Sequelize.INTEGER,
    //     allowNull: false,
    //     validate: {
    //         notEmpty: true
    //     }
    // },
    // storeId: {
    //     type: Sequelize.INTEGER,
    //     allowNull: false,
    //     validate: {
    //         notEmpty: true
    //     }
    // },
});

module.exports = StorePreference;