const express = require("express");
const router = express.Router();

const hobbyController = require("../controllers/hobby");

// Authenticate Routes
const { isAuthenticated } = require("../middleware/authenticate");

// Route to get all hobby
router.get("/", hobbyController.getAllHobbies);

// Route to get a specific hobby by ID
router.get("/:id", hobbyController.getHobbyById);

// Route to get a specific hobby by City
// router.get("/user/:user", hobbyController.getHobbyByUser);

// Route to PUT a hobby
router.post("/", isAuthenticated, hobbyController.addHobby);

// Route to PATCH a hobby
router.put("/:id", isAuthenticated, hobbyController.updateHobby);

// Route to DELETE a hobby
router.delete("/:id", isAuthenticated, hobbyController.deleteHobby);

module.exports = router;
