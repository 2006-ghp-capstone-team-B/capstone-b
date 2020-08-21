const router = require('express').Router()
const { User } = require('../db/models')


//all the users
router.get('/', async (req, res, next) => {
    try {
        const users = await User.findAll()
        res.json(users)
    } catch (error) {
        next(error)
    }
})


// User can see their own user profile api/users/:id
router.get('/:userId', async (req, res, next) => {
    try {
        const singleUser = await User.findByPk(req.params.userId)
        res.json(singleUser)
    } catch (error) {
        next(error)
    }
})



// User can see lists

module.exports = router
