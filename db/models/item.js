const Sequelize = require('sequelize')
const db = require('../db')

const Item = db.define("item", {
    itemName: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notEmpty: true
        } 
    }
})

module.exports = Item