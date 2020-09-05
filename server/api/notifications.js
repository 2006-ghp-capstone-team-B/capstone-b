const router = require("express").Router();
const { Notification } = require("../db/models");

router.get("/:userId", async (req, res, next) => {
  try {
    const notifications = await Notification.findAll({
      where: {
        userId: req.params.userId,
      },
    });
    res.json(notifications);
  } catch (error) {
    next(error);
  }
});

router.put("/read", async (req, res, next) => {
  try {
    const notificationId = req.body.notificationId;
    const toUpdate = await Notification.findById(notificationId);
    const userId = toUpdate.userId;
    toUpdate.unread = false;
    await toUpdate.save();

    // send back all the noties
    const updatedNotifications = await Notifications.findAll({ where: { userId: userId } });
    res.json(updatedNotifications);
  } catch (error) {
    next(error);
  }
});

router.post("/locationError", async (req, res, next) => {
  try {
    const userId = req.body.userId;
    await Notification.findOrCreate({
      where: {
        userId: userId,
        notificationTitle: "Permission Denied",
        notificationBody:
          "We are not able to use your location to determine how far you are from your favorite store. Please set local permission to Always Allow to use this feature",
        type: "location",
      },
    });
  } catch (e) {
    next(e);
  }
});

module.exports = router;
