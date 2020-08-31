const router = require("express").Router();
const { User, ListAccess, List, ItemUserList, Item } = require("../db/models");

//all the users
//ADMIN only functionality
router.get("/", async (req, res, next) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    next(error);
  }
});

// //route for get user's private list Id
// router.get("/:userId", async (req, res, next) => {
//   try {
//     const user = await User.findByPk(req.params.userId);
    
//     res.json(users);
//   } catch (error) {
//     next(error);
//   }
// });

// post route
router.post("/", async (req, res, next) => {
  try {
    console.log('inside post req')
    const newUser = await User.create(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
});

// put route

// delete route


module.exports = router;
