const express = require("express");
const router = express.Router();

const locationsController = require("../controllers/location");

// Authenticate Routes
const { isAuthenticated } = require("../middleware/authenticate");

// Route to get all locations
router.get("/", locationsController.getAllLocations);

// Route to get a specific location by ID
router.get("/:id", locationsController.getLocationById);

// Route to get a specific location by City
router.get("/city/:city", locationsController.getLocationByCity);

// Route to PUT a location
router.post("/", isAuthenticated, locationsController.addLocation);

// Route to PATCH a location
router.put("/:id", isAuthenticated, locationsController.updateLocation);

// Route to DELETE a location
router.delete("/:id", isAuthenticated, locationsController.deleteLocation);

module.exports = router;
