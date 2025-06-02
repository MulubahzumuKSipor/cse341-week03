const express = require("express");
const router = express.Router();

const locationsController = require("../controllers/location");

// Route to get all locations
router.get("/", locationsController.getAllLocations);

// Route to get a specific location by ID
router.get("/:id", locationsController.getLocationById);

// Route to PUT a location
router.post("/", locationsController.addLocation);

// Route to PATCH a location
router.put("/:id", locationsController.updateLocation);

// Route to DELETE a location
router.delete("/:id", locationsController.deleteLocation);

module.exports = router;
