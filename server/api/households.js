const router = require("express").Router();
const { User, ListAccess, List, ItemUserList, Item, StorePreference, Store } = require("../db/models");

//all the lists
router.get("/", async (req, res, next) => {
  try {
    const lists = await List.findAll();
    res.json(lists);
  } catch (error) {
    next(error);
  }
});

router.get("/:userId", async (req, res, next) => {
  try {
    const households = await ListAccess.findAll({
      where: {
        userId: req.params.userId,
        category: "household",
      },
      include: List,
    });
    res.json(households);
  } catch (error) {
    next(error);
  }
});

router.post("/:userId", async (req, res, next) => {
  try {
    const newHousehold = await ListAccess.create(req.body);
    res.json(newHousehold);
  } catch (error) {
    next(error);
  }
});

router.get("/:listId/members", async (req, res, next) => {
  try {
    const members = await ListAccess.findAll({
      where: { listId: req.params.listId },
      include: { model: User },
    });
    res.json(members);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
