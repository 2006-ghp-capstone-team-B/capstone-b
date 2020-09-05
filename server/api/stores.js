const router = require("express").Router();
const { User, ListAccess, List, ItemUserList, Item, StorePreference, Store } = require("../db/models");

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

router.post("/:userId", async (req, res, next) => {
  try {
    const [store, createdStore] = await Store.findOrCreate({
      where: {
        storeName: req.body.storeName,
        latitude: req.body.latitude,
        longitude: req.body.longitude,
        category: req.body.category,
      },
    });
    const [storePref, createdStorePref] = await StorePreference.findOrCreate({
      where: {
        storeId: store.id,
        userId: req.params.userId,
      },
      include: { model: Store },
    });

    const newPref = await StorePreference.findOne({
      where: {
        storeId: store.id,
        userId: req.params.userId,
      },
      include: { model: Store },
    });
    res.status(201).json(newPref);
  } catch (error) {
    next(error);
  }
});

router.delete("/:userId/:storeId", async (req, res, next) => {
  try {
    const storeToDelete = await StorePreference.destroy({
      where: {
        userId: req.params.userId,
        storeId: req.params.storeId,
      },
    });

    // get updated StorePref list
    const updatedStorePrefs = await StorePreference.findAll({
      where: { userId: req.params.userId },
      include: { model: Store },
    });
    res.json(updatedStorePrefs);
  } catch (e) {
    next(e);
  }
});
module.exports = router;
