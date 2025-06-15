const express = require("express");
const router = express.Router();

const friendController = require("../controllers/friend");

// Authenticate Routes
const { isAuthenticated } = require("../middleware/authenticate");

// Route to get all friend
router.get("/", friendController.getAllFriend);

// Route to get a specific friend by ID
router.get("/:id", friendController.getFriendById);

// Route to get a specific friend by Username
// router.get("/user/:user", friendController.getFriendByUser);

// Route to PUT a friend
router.post("/", isAuthenticated, friendController.addFriend);

// Route to PATCH a friend
router.put("/:id", isAuthenticated, friendController.updateFriend);

// Route to DELETE a friend
router.delete("/:id", isAuthenticated, friendController.deleteFriend);

module.exports = router;
