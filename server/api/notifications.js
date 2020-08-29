const router = require("express").Router();
const { Notification} = require("../db/models");

router.get("/:userId", async (req, res, next) => {
  try {
    const notifications = await Notification.findAll({
      where: {
        userId: req.params.userId,
       }
    });
    res.json(notifications);
  } catch (error) {
    next(error);
  }
});

module.exports = router
