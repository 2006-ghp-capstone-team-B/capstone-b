const router = require("express").Router();
const { Item, Store, StorePreference, ItemUserList } = require("../db/models");

//all the Items
router.get("/", async (req, res, next) => {
  try {
    const items = await Item.findAll();
    res.json(items);
  } catch (error) {
    next(error);
  }
});

router.get("/itemUserList", async (req, res, next) => {
  try {
    const item = await ItemUserList.findAll();
    res.json(item);
  } catch (error) {
    console.log(error);
  }
});

router.post("/add", async (req, res, next) => {
  try {
    const { itemId, listId, userId } = req.body;
    const [item, created] = await ItemUserList.findCreateFind({ where: { itemId, listId, userId } });
    item.quantity = item.quantity + 1;
    await item.save();
    res.json(item);
  } catch (error) {
    console.log(error);
  }
});

router.put("/reduce", async (req, res, next) => {
  try {
    const { itemId, listId, userId } = req.body;
    const item = await ItemUserList.findOne({
      where: {
        itemId,
        listId,
        userId,
      },
    });
    if (item.quantity > 1) {
      item.quantity = item.quantity - 1;
      await item.save();
      res.json(item);
    } else {
      const itemCopy = JSON.parse(JSON.stringify(item));
      await item.destroy();
      res.json(itemCopy);
    }
  } catch (error) {
    console.log(error);
  }
});

router.put("/remove", async (req, res, next) => {
  try {
    const { itemId, listId } = req.body;
    const item = await ItemUserList.findAll({
      where: {
        itemId,
        listId,
      },
    });
    const itemCopy = JSON.parse(JSON.stringify(item));
    for (let i = 0; i < item.length; i++) {
      await item[i].destroy();
    }
    // await item.destroy();
    res.status(204).json(itemCopy);
  } catch (error) {
    console.log(error);
  }
});

//add new item to Item table
router.post("/", async (req, res, next) => {
  try {
    const item = await Item.create(req.body);
    res.json(item);
  } catch (error) {
    next(error);
  }
});

//route for each single item:  "api/items/:id"
router.get("/:itemId", async (req, res, next) => {
  try {
    const singleItem = await Item.findById(req.params.itemId);
    res.json(singleItem);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
