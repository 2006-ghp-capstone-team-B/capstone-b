const router = require('express').Router()
const { List } = require('../db/models')


//all the lists
router.get('/', async (req, res, next) => {
    try {
        const lists = await List.findAll()
        res.json(lists)
    } catch (error) {
        next(error)
    }
})


// route for api/lists/:listId
router.get('/:listId', async (req, res, next) => {
    try {
        const listPrivate = await List.findByPk(req.params.listId)
        res.json(listPrivate)
    } catch (error) {
        next(error)
    }
})


module.exports = router
