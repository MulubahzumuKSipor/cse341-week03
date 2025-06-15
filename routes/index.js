const passport = require("passport");

const router = require("express").Router();

router.use("/", require("./swagger"));
// router.get("/", (req, res) => {
//   res.send("Welcome to the Home Page!");
// });

router.use("/locations", require("./location"));
router.use("/user", require("./user"));
router.use("/friend", require("./friend"));
router.use("/hobby", require("./hobby"));

router.get("/login", passport.authenticate("github"), (req, res) => {});

router.get("/logout", function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

module.exports = router;
