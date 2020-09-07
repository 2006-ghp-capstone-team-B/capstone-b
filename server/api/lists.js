const router = require("express").Router();
const { User, List, ListAccess, ItemUserList, Item, Notification } = require("../db/models");

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
      include: [{ model: Item }, { model: User }],
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

    const noty = await Notification.create({
      userId: id,
      notificationTitle: "New Household Created",
      notificationBody: `Congratulations! You created a new household. Your household id is: ${newList.id}. Don't forget to tell your roommates to join and you can start sharing your grocery list!`,
      type: "other",
    });

    res.json(newList.id);
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

    // ADDED CONFIRMATION NOTIFICATION
    const selfNoty = await Notification.create({
      userId: id,
      notificationTitle: "Request Sent",
      notificationBody: `Your request to join Household ${listId} has been submitted. We will notify you when it has been accepted.`,
      type: "other",
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

router.post("/accept", async (req, res, next) => {
  try {
    const { userId, listId } = req.body;
    console.log(typeof userId, "type of userId");
    console.log(typeof listId, "type of listid");
    const toUpdate = await ListAccess.findOne({ where: { userId, listId, category: "household", confirmed: false } });

    toUpdate.confirmed = true;
    await toUpdate.save();
    res.json(toUpdate);
    const notyToDelete = await Notification.destroy({ where: { requestUserId: userId, requestListId: listId } });
    res.json("destroyed");

    // create accept noty for reqUser
    const noty = await Notification.findOrCreate({
      where: {
        userId: userId,
        notificationTitle: "You've been added to a household!",
        notificationBody: `You've been accepted into household ${listId}! Head over to your new list and start sharing items!`,
        type: "other",
      },
    });
  } catch (e) {
    next(e);
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

//add new item to ItemUserList
router.post("/:listId", async (req, res, next) => {
  try {
    const newItem = await ItemUserList.create(req.body);
    res.json(newItem);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
