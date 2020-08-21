const router = require('express').Router()
const { Item } = require('../db/models')


//all the Items
router.get('/', async (req, res, next) => {
    try {
        const items = await Item.findAll()
        res.json(items)
    } catch (error) {
        next(error)
    }
})


//route for each single item:  "api/items/:id"
router.get('/:itemId', async (req, res, next) => {
    try {
        const singleItem = await Item.findByPk(req.params.itemId)
        res.json(singleItem)
    } catch (error) {
        next(error)
    }
})


module.exports = router
