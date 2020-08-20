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
  coordinates: { // 40.7175795,-73.9945671
    type: Sequelize.ARRAY(Sequelize.DECIMAL),
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
})

module.exports = Store;
