const router = require("express").Router();

router.use("/", require("./swagger"));
router.get("/", (req, res) => {
  res.send("Welcome to the Home Page!");
});

router.use("/locations", require("./location"));
// router.use("/user", require("./user"));

module.exports = router;
