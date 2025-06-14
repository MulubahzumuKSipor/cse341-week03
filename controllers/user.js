const { isValidObjectId } = require("mongoose");
const mongodb = require("../data/database");
const { isValidUser } = require("../utilities");
const ObjectId = require("mongodb").ObjectId;

// Controller to handle users-related requests
const getAllUser = async (req, res) => {
  const results = await mongodb.getDb().collection("Users").find();
  results
    .toArray()
    .then((Users) => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(Users);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
};

const getUserById = async (req, res) => {
  const usersId = new ObjectId(req.params.id);
  if (!ObjectId.isValid(usersId)) {
    return res.status(400).json({ error: "Invalid user ID" });
  }
  try {
    const results = await mongodb
      .getDb()
      .collection("Users")
      .find({ _id: usersId });
    results.toArray().then((users) => {
      if (users.length > 0) {
        res.setHeader("Content-Type", "application/json");
        res.status(200).json(users[0]);
      } else {
        res.status(404).json({ message: "User not found" });
      }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getUserByName = async (req, res) => {
  const name = req.params.name;

  try {
    const results = await mongodb
      .getDb()
      .collection("Users")
      .find({ firstName: { $regex: new RegExp(`^${name}$`, "i") } })
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
const addUser = async (req, res) => {
  if (!req.body.Country || !req.body.City) {
    return res.status(400).json({ error: "Country and City are required" });
  }
  const newusers = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    username: req.body.username,
    phone: req.body.phone,
    country: req.body.country,
    city: req.body.city,
  };
  try {
    const results = await mongodb
      .getDb()
      .collection("Users")
      .insertOne(newusers);
    if (results.acknowledged) {
      res
        .status(201)
        .json({ message: "users added successfully", id: results.insertedId });
    } else {
      res.status(500).json({ error: "Failed to add users" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateUser = async (req, res) => {
  const usersId = new ObjectId(req.params.id);
  if (!isValidUser) {
    return res.status(400).json({ error: "Every field is required" });
  }
  if (updatedusers === undefined) {
    return res.status(400).json({ error: "No data provided for update" });
  }
  if (!isValidObjectId) {
    return res.status(400).json({ error: "Invalid users ID" });
  }
  const updatedusers = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    username: req.body.username,
    phone: req.body.phone,
    country: req.body.country,
    city: req.body.city,
  };
  try {
    const results = await mongodb
      .getDb()
      .collection("Users")
      .updateOne({ _id: usersId }, { $set: updatedusers });
    if (results.modifiedCount > 0) {
      res.status(200).json({ message: "User updated successfully" });
    } else {
      res.status(404).json({ message: "User not found or no changes made" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteUser = async (req, res) => {
  const usersId = new ObjectId(req.params.id);
  if (!isValidObjectId) {
    return res.status(400).json({ error: "Invalid user ID" });
  }
  try {
    const results = await mongodb
      .getDb()
      .collection("Users")
      .deleteOne({ _id: usersId });
    if (results.deletedCount > 0) {
      res.status(200).json({ message: "User deleted successfully" });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getAllUser,
  getUserById,
  getUserByName,
  addUser,
  updateUser,
  deleteUser,
};
