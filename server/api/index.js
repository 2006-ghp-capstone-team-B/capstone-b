const router = require("express").Router();
module.exports = router;

router.use("/users", require("./users"));
router.use("/items", require("./items"));
router.use("/lists", require("./lists"));
router.use("/stores", require("./stores"));
router.use("/households", require("./households"));

router.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});
