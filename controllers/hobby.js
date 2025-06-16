const mongodb = require("../data/database");
const { isValidHobby } = require("../utilities");
const ObjectId = require("mongodb").ObjectId;

// Controller to handle Hobby-related requests
const getAllHobbies = async (req, res) => {
  const results = await mongodb.getDb().collection("Hobbies").find();
  try {
    results.toArray().then((hobby) => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(hobby);
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getHobbyById = async (req, res) => {
  const hobbyId = new ObjectId(req.params.id);
  const results = await mongodb
    .getDb()
    .collection("Hobbies")
    .find({ _id: hobbyId });
  try {
    results.toArray().then((hobby) => {
      if (hobby.length > 0) {
        res.setHeader("Content-Type", "application/json");
        res.status(200).json(hobby[0]);
      } else {
        res.status(404).json({ message: "hobby not found" });
      }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// const getHobbyByUser = async (req, res) => {
//   const city = req.params.city;

//   try {
//     const results = await mongodb
//       .getDb()
//       .collection("Hobbies")
//       .find({ City: { $regex: new RegExp(`^${city}$`, "i") } })
//       .toArray();
//     if (results.length > 0) {
//       res.status(200).json(results);
//     } else {
//       res.status(404).json({ message: "No matching data found." });
//     }
//   } catch (error) {
//     console.error("Error fetching data by name:", error);
//     res.status(500).json({ message: "Server error." });
//   }
// };

const addHobby = async (req, res) => {
  if (!isValidHobby) {
    return res
      .status(400)
      .json({ error: "Hobby, type, frequency and ranking are required" });
  }
  const newhobby = {
    hobby: req.body.hobby,
    type: req.body.type,
    frequency: req.body.frequency,
    ranking: req.body.ranking,
  };
  try {
    const results = await mongodb
      .getDb()
      .collection("Hobbies")
      .insertOne(newhobby);
    if (results.acknowledged) {
      res.status(201).json({
        message: "hobby added successfully",
        id: results.insertedId,
      });
    } else {
      res.status(500).json({ error: "Failed to add hobby" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateHobby = async (req, res) => {
  const hobbyId = new ObjectId(req.params.id);
  if (!isValidHobby) {
    return res
      .status(400)
      .json({ error: "Hobby, type, frequency and ranking are required" });
  }
  if (!ObjectId.isValid(hobbyId)) {
    return res.status(400).json({ error: "Invalid hobby ID" });
  }
  const updatedhobby = {
    hobby: req.body.hobby,
    type: req.body.type,
    frequency: req.body.frequency,
    ranking: req.body.ranking,
  };
  try {
    const results = await mongodb
      .getDb()
      .collection("Hobbies")
      .updateOne({ _id: hobbyId }, { $set: updatedhobby });
    if (results.modifiedCount > 0) {
      res.status(200).json({ message: "hobby updated successfully" });
    } else {
      res.status(404).json({ message: "hobby not found or no changes made" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteHobby = async (req, res) => {
  const hobbyId = new ObjectId(req.params.id);
  if (!ObjectId.isValid(hobbyId)) {
    return res.status(400).json({ error: "Invalid hobby ID" });
  }
  try {
    const results = await mongodb
      .getDb()
      .collection("Hobbies")
      .deleteOne({ _id: hobbyId });
    if (results.deletedCount > 0) {
      res.status(200).json({ message: "hobby deleted successfully" });
    } else {
      res.status(404).json({ message: "hobby not found" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getAllHobbies,
  getHobbyById,
  // getHobbyByUser,
  addHobby,
  updateHobby,
  deleteHobby,
};
