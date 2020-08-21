const router = require('express').Router()
const { User } = require('../db/models')

// User can see their own user profile
router.get('/:id', async (req, res, next) => {
    try {
        const singleUser = await User.findById(req.params.id)
        res.json(singleUser)
    } catch (error) {
        next(error)
    }
})

// User can see lists

module.exports = router
