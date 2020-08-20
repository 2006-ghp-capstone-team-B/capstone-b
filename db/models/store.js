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
            ""
        ),
        allowNull: false,
        validate: {
          notEmpty: true
        }     
    }
})