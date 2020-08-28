const router = require("express").Router();
const { User, ListAccess, List, ItemUserList, Item, StorePreference, Store } = require("../db/models");

router.get("/:userId", async (req, res, next) => {
  try {
    const households = await ListAccess.findAll({
      where: {
        userId: req.params.userId,
        category: "household"
       }
    });
    res.json(households);
  } catch (error) {
    next(error);
  }
});

module.exports = router
