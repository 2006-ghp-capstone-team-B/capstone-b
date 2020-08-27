const Sequelize = require('sequelize')
const db = require('../db')


const Store = db.define("store", {
  storeName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  category: {
    type: Sequelize.ENUM(
      "Groceries",
      "Cosmetics",
      "Pharmacy",
      "Clothing",
      "Mall",
      "Restaurant",
      "Coffee Shop",
      "Other"
    ),
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  latitude: {
    type: Sequelize.DECIMAL,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  longitude: {
    type: Sequelize.DECIMAL,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
})

module.exports = Store;
