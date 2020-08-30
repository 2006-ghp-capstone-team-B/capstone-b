const router = require("express").Router();
const { User } = require("../db/models");

router.post("/login", async (req, res, next) => {
  const { email, password } = req.body;
  try {
    console.log("reqqq", req.body)
    const user = await User.findOne({ where: { email } });
    console.log("LOG", user)
    if (!user) {
      console.log("No such user found:", email);
      res.status(401).send("Wrong username and/or password");
    } else if (!user.correctPassword(password)) {
      console.log("Incorrect password for user:", email);
      res.status(401).send("Wrong username and/or password");
    } else {
      req.login(user, (err) => (err ? next(err) : res.json(user)));
    }
  } catch (err) {
    next(err);
  }
});

router.post("/signup", async (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;
  try {
    const user = await User.create({ firstName, lastName, email, password });
    req.login(user, (err) => (err ? next(err) : res.json(user)));
  } catch (err) {
    if (err.name === "SequelizeUniqueConstraintError") {
      res.status(401).send("User already exists");
    } else {
      next(err);
    }
  }
});

router.post("/logout", async (req, res) => {
  req.logout();
  //req.session.destroy()
  //res.redirect("/");
});

router.get("/me", (req, res) => {
  res.json(req.user);
});

module.exports = router;
