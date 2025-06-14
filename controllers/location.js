const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;

// Controller to handle location-related requests
const getAllLocations = async (req, res) => {
  const results = await mongodb.getDb().collection("Locations").find();
  try {
    results.toArray().then((locations) => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(locations);
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getLocationById = async (req, res) => {
  const locationId = new ObjectId(req.params.id);
  const results = await mongodb
    .getDb()
    .collection("Locations")
    .find({ _id: locationId });
  try {
    results.toArray().then((location) => {
      if (location.length > 0) {
        res.setHeader("Content-Type", "application/json");
        res.status(200).json(location[0]);
      } else {
        res.status(404).json({ message: "Location not found" });
      }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getLocationByCity = async (req, res) => {
  const city = req.params.city;

  try {
    const results = await mongodb
      .getDb()
      .collection("Locations")
      .find({ City: { $regex: new RegExp(`^${city}$`, "i") } })
      .toArray();
    if (results.length > 0) {
      res.status(200).json(results);
    } else {
      res.status(404).json({ message: "No matching data found." });
    }
  } catch (error) {
    console.error("Error fetching data by name:", error);
    res.status(500).json({ message: "Server error." });
  }
};

const addLocation = async (req, res) => {
  if (!req.body.Country || !req.body.City) {
    return res.status(400).json({ error: "Country and City are required" });
  }
  const newLocation = {
    Country: req.body.Country,
    City: req.body.City,
  };
  try {
    const results = await mongodb
      .getDb()
      .collection("Locations")
      .insertOne(newLocation);
    if (results.acknowledged) {
      res.status(201).json({
        message: "Location added successfully",
        id: results.insertedId,
      });
    } else {
      res.status(500).json({ error: "Failed to add location" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateLocation = async (req, res) => {
  const locationId = new ObjectId(req.params.id);
  if (!req.body.Country || !req.body.City) {
    return res.status(400).json({ error: "Country and City are required" });
  }
  if (!ObjectId.isValid(locationId)) {
    return res.status(400).json({ error: "Invalid location ID" });
  }
  const updatedLocation = {
    Country: req.body.Country,
    City: req.body.City,
  };
  try {
    const results = await mongodb
      .getDb()
      .collection("Locations")
      .updateOne({ _id: locationId }, { $set: updatedLocation });
    if (results.modifiedCount > 0) {
      res.status(200).json({ message: "Location updated successfully" });
    } else {
      res
        .status(404)
        .json({ message: "Location not found or no changes made" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteLocation = async (req, res) => {
  const locationId = new ObjectId(req.params.id);
  if (!ObjectId.isValid(locationId)) {
    return res.status(400).json({ error: "Invalid location ID" });
  }
  try {
    const results = await mongodb
      .getDb()
      .collection("Locations")
      .deleteOne({ _id: locationId });
    if (results.deletedCount > 0) {
      res.status(200).json({ message: "Location deleted successfully" });
    } else {
      res.status(404).json({ message: "Location not found" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getAllLocations,
  getLocationById,
  getLocationByCity,
  addLocation,
  updateLocation,
  deleteLocation,
};
