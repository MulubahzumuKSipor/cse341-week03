const express = require("express");
const router = express.Router();

const userController = require("../controllers/user");

// Authenticate Routes
const { isAuthenticated } = require("../middleware/authenticate");

// Route to get all user
router.get("/", userController.getAllUser);

// Route to get a specific user by ID
router.get("/:id", userController.getUserById);

// Route to PUT a user
router.post("/", isAuthenticated, userController.addUser);

// Route to PATCH a user
router.put("/:id", isAuthenticated, userController.updateUser);

// Route to DELETE a user
router.delete("/:id", isAuthenticated, userController.deleteUser);

module.exports = router;
