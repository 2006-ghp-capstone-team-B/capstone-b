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

//POTENTIALLY MOVING THIS ROUTE TO API/INDEX.JS
// User can see their own user profile api/users/:id
router.get("/:userId", async (req, res, next) => {
  try {
    const singleUser = await User.findByPk(req.params.userId);

    //Define all the info that we will send to the front-end's user profile
    let profileInfo = [];
    const userName = singleUser.firstName;
    const password = singleUser.password;
    const listPrivate = await ListAccess.findOne({
      where: {
        userId: singleUser.id,
        category: "private"
      }
    })
    const storePreferences = ["Empty for now"]; //TBD
    //Push all the info to front-end
    profileInfo.push({ userName, password, listPrivate, storePreferences })

    res.json(profileInfo);
  } catch (error) {
    next(error);
  }
});

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


/*                      */
/* PRIVATE LISTS ROUTES */
/*                      */


// User can see their private list
router.get('/:userId/listPrivate', async (req, res, next) => {
  try {

    const listAccess = await ListAccess.findOne({
      where: {
        userId: req.params.userId,
        category: "private"
      }
    })
    const listPrivateId = listAccess.listId
    const list = await List.findOne({
      where: {
        id: listPrivateId
      }
    })
    res.json(list)
  } catch (error) {
    next(error);
  }
})

//user can see all the items and quantity in their private list
//listItems is an array of object, the object has two property: item and quantity. And item is an object(itemName is insde), quantity is number
router.get('/:userId/listPrivate/items', async (req, res, next) => {
  try {

    const listAccess = await ListAccess.findOne({
      where: {
        userId: req.params.userId,
        category: "private"
      }
    })
    const listPrivateId = listAccess.listId
    const items = await ItemUserList.findAll({
      where: {
        listId: listPrivateId
      }
    })

    let listItems = []
    for (let i = 0; i < items.length; i++) {
      const quantity = items[i].quantity
      const itemId = items[i].itemId
      const item = await Item.findOne({
        where: {
          id: itemId
        }
      })
      listItems.push({ item, quantity })
    }
    res.json(listItems)

  } catch (error) {
    next(error);
  }
})

/*                        */
/* HOUSEHOLD LISTS ROUTES */
/*                        */

//get the list information like list name and list members
router.get('/:userId/listHousehold', async (req, res, next) => {
  try {
    //for now, each user only have one household list, so .findOne
    //after mvp, each use can have multiple household lists, so .findAll
    const listAccess = await ListAccess.findOne({
      where: {
        userId: req.params.userId,
        category: "household"
      }
    })
    const listHouseholdId = listAccess.listId
    const listHouseholdName = listAccess.listName
    let listHouseholdMembers = []
    const records = await ListAccess.findAll({
      where: {
        listId: listHouseholdId
      }
    })

    for (let i = 0; i < records.length; i++) {
      const userId = records[i].dataValues.userId
      const user = await User.findOne({
        where: {
          id: userId
        }
      })
      listHouseholdMembers.push({ firstName: user.firstName, lastName: user.lastName })
    }

    const householdInfo = { listHouseholdId, listHouseholdName, listHouseholdMembers }
    res.json(householdInfo)
  } catch (error) {
    next(error);
  }
})


//after mvp, ":userId/listHousehold/:listHouseholdId/items" for each household list
router.get('/:userId/listHousehold/items', async (req, res, next) => {
  try {
    // const userId = req.params.userId
    const listAccess = await ListAccess.findOne({
      where: {
        userId: req.params.userId,
        category: "household"
      }
    })
    const listHouseholdId = listAccess.listId
    const items = await ItemUserList.findAll({
      where: {
        listId: listHouseholdId
      }
    })

    let listItems = []
    for (let i = 0; i < items.length; i++) {
      const quantity = items[i].quantity
      const itemId = items[i].itemId
      const item = await Item.findOne({
        where: {
          id: itemId
        }
      })
      const record = await ItemUserList.findOne({
        where: {
          itemId: itemId,
        }
      })
      const userId = record.userId;
      const user = await User.findOne({
        where: {
          id: userId,
        }
      })
      const userName = user.firstName
      listItems.push({ item, quantity, userName })
    }
    res.json(listItems)

  } catch (error) {
    next(error);
  }
})


router.put('/:userId/listHousehold/items', async (req, res, next) => {
  try {
    console.log("this is the req.body", req.body)
    const updatedItems = await ItemUserList.update(req.body)
    console.log("this is the updatedItems", updatedItems)
    res.json(updatedItems)
  } catch (error) {
    next(error)
  }
})


module.exports = router;
