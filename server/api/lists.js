const router = require('express').Router()
const { List } = require('../db/models')


//all the users
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
        const singleList = await List.findByPk(req.params.listId)
        res.json(singleList)
    } catch (error) {
        next(error)
    }
})


module.exports = router
