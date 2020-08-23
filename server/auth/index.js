const router = require("express").Router();
const { User } = require("../db/models");

router.post('/signup', async (req, res, next) => {
  try {
    console.log('inside post req')
    const newUser = await User.create(req.body);
    console.log(newUser)
    res.status(201).json(newUser);
  } catch (err) {
      next(err)
  }
})

module.exports = router