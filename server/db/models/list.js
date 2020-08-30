const Sequelize = require('sequelize')
const db = require('../db')

const List = db.define("list", {
  listName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
        notEmpty: true
    },
  },
})

module.exports = List
