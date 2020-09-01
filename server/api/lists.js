const router = require("express").Router();
const { List, ListAccess, ItemUserList, Item, Notification } = require("../db/models");

//all the lists
// router.get('/', async (req, res, next) => {
//     try {
//         const lists = await List.findAll()
//         res.json(lists)
//     } catch (error) {
//         next(error)
//     }
// })

//route for get the private list info (not items in lst)
router.get("/privatelist/:userId", async (req, res, next) => {
  try {
    const privateList = await ListAccess.findOne({
      where: {
        userId: req.params.userId,
        category: "private",
      },
      include: List,
    });
    res.json(privateList);
  } catch (error) {
    next(error);
  }
});

// route for api/lists/:listId
router.get("/private/:userId", async (req, res, next) => {
  try {
    const listPrivate = await ListAccess.findOne({
      where: {
        userId: req.params.userId,
        category: "private",
      },
    });
    const listItems = await ItemUserList.findAll({
      where: { listId: listPrivate.listId },
      include: { model: Item },
    });
    res.json(listItems);
  } catch (error) {
    next(error);
  }
});

router.get("/household/:listId", async (req, res, next) => {
  try {
    const listItems = await ItemUserList.findAll({
      where: { listId: req.params.listId },
      include: { model: Item },
    });
    res.json(listItems);
  } catch (error) {
    next(error);
  }
});

//create new household list
router.post("/", async (req, res, next) => {
  try {
    const newList = await List.create(req.body);
    res.json(newList)
  } catch (error) {
    next(error);
  }
});

router.get("/:listId", async (req, res, next) => {
  try {
    const list = await ListAccess.findOne({
      where: {
        listId: req.params.listId,
        category: "household",
      },
      include: {
        model: List,
      },
    });
    res.json(list);
  } catch (error) {
    next(error);
  }
});

router.post("/access/:listId/:userId", async (req, res, next) => {
  try {
    // console.log("222222222222222222222) right before list access")
    // console.log(req.params.userId)
    // console.log(typeof (req.params.userId))

    // console.log(req.params.listId)
    // console.log(typeof (req.params.listId))
    await ListAccess.create({
      listId: req.params.listId,
      userId: req.params.userId,
      category: "household",
      confirmed: true,
    });
    // console.log("hi");
    res.sendStatus(201);
  } catch (error) {
    next(error);
  }
});

// request to join a household
router.post("/join", async (req, res, next) => {
  try {
    const { listId, id, firstName, lastName } = req.body;
    const [newMember, addedMember] = await ListAccess.findOrCreate({
      where: {
        userId: id,
        listId,
        category: "household",
      },
    });

    const householdMembers = await ListAccess.findAll({
      where: {
        listId,
        confirmed: true,
      },
    });

    for (let i = 0; i < householdMembers.length; i++) {
      const noty = await Notification.findOrCreate({
        where: {
          userId: householdMembers[i].userId,
          notificationTitle: "New Household Request",
          notificationBody: `${firstName} ${lastName} would like to join your household. Please choose an option below.`,
          type: "memberRequest",
        },
      });
    }
  } catch (error) {
    next(error);
  }
});

//add new item to ItemUserList
router.post("/:listId", async (req, res, next) => {
  try {
    const newItem = await ItemUserList.create(req.body);
    res.json(newItem);
  } catch (error) {
    console.log(error);
  }
});

//get the list by id
router.get("/:listId", async (req, res, next) => {
  try {
    const list = await ListAccess.findOne({
      where: {
        listId: req.params.listId,
        category: "household",
      },
      include: {
        model: List,
      },
    });
    res.json(list);
  } catch (error) {
    next(error);
  }
});

//update item quantity
router.put("/:listId/:itemId", async (req, res, next) => {
  try {
    const item = await ItemUserList.findOne({
      where: {
        listId: req.params.listId,
        itemId: req.params.itemId,
      },
    });
    const updatedItem = await item.update({ quantity: req.body.quantity });
    res.json(updatedItem);
  } catch (error) {
    console.log(error);
  }
});

//DELETE sinle item
router.delete("/:listId/:itemId", async (req, res, next) => {
  try {
    const deletedItem = await ItemUserList.destroy({
      where: {
        listId: req.params.listId,
        itemId: req.params.itemId,
      },
    });
    res.json(deletedItem);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
