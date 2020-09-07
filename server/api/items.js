const router = require("express").Router();
const { Item, Store, StorePreference, ItemUserList } = require("../db/models");

//all the Items
router.get("/", async (req, res, next) => {
  try {
    const items = await items.findAll();
    res.json(items);
  } catch (error) {
    next(error);
  }
});

//route for each single item:  "api/items/:id"
router.get("/:itemId", async (req, res, next) => {
  try {
    const singleItem = await Item.findByPk(req.params.itemId);
    res.json(singleItem);
  } catch (error) {
    next(error);
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

//NEW update item quantity
router.put("/add", async (req, res, next) => {
  try {
    const {itemId, listId, userId} = req.body
    const item = await ItemUserList.findOrCreate({
      where: {
        itemId,
        listId,
        userId
      },
    });
    item.quantity = item.quantity+1
    await item.save();
    res.json(item)
  } catch (error) {
    console.log(error);
  }
});

//NEW reduce item quantity
router.put("/reduce", async (req, res, next) => {
  try {
    const {itemId, listId, userId} = req.body
    const item = await ItemUserList.findOne({
      where: {
        itemId,
        listId,
        userId
      },
    });

    if(item.quantity > 1) {
      item.quantity = item.quantity - 1
      await item.save();
    } else {
      item.destroy()
    }
  } catch (error) {
    console.log(error);
  }
});

router.delete("/remove", async (req, res, next) => {
  try {
    const {itemId, listId, userId} = req.body
    const item = await ItemUserList.destroy({
      where: {
        itemId,
        listId,
        userId
      },
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
