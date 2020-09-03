const router = require("express").Router();
const { User } = require("../db/models");
const List = require("../db/models/list");

router.post("/login", async (req, res, next) => {
  const { email, password } = req.body;
  try {
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

    const noty = await Notification.create({
      userId: user.id,
      notificationTitle: 'Welcome to Peasy!',
      notificationBody: `Hi ${firstName}! We're so excited you've joined Peasy. To get started, head over to your personal list and start adding your items. Roommates already on Peasy? Don't forget to request to join their household to access a shared list.`,
      type: 'welcome'
    })

    const privateList = await List.create({
      listName: `${firstName}'s List`
    })

    const listOwnership = await ListAccess.create({
      category: 'private',
      confirmed: true,
      userId: user.id,
      listId: privateList.id
    })

    req.login(user, (err) => (err ? next(err) : res.json(user)));
  } catch (err) {
    if (err.name === "SequelizeUniqueConstraintError") {
      res.status(401).send("User already exists");
    } else {
      console.log(err.response)
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
