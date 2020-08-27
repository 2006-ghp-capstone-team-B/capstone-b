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
    });
    res.status(201).json(storePref);
  } catch (error) {
    next(error);
  }
});

// delete the store from StorePreference
// but have it still be in Store
router.delete("/:userId", async (req, res, next) => {
  try {
    await StorePreference.destroy({ where: { storeId: req.body.storeId } });

    // get updated StorePref list
    const updatedStorePrefs = await StorePreference.findAll({
      where: { userId: req.params.userId },
      include: { model: Store },
    });
    res.json(updatedStorePrefs);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
