const router = require("express").Router();
const { User, ListAccess, List, ItemUserList, Item, StorePreference, Store } = require("../db/models");

//POTENTIALLY MOVING THIS ROUTE TO API/INDEX.JS
// User can see their own user profile api/users/:id

router.get("/", async (req, res, next) => {
  try {
    const allStores = await StorePreference.findAll();
    res.json(allStores);
  } catch (error) {
    next(error);
  }
});

router.get("/:userId", async (req, res, next) => {
  try {
    const storesForUser = await StorePreference.findAll({
      where: { userId: req.params.userId },
      include: { model: Store },
    });
    res.json(storesForUser);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
