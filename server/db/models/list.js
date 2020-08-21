const Sequelize = require('sequelize')
const db = require('../db')

const List = db.define("list", {})

module.exports = List