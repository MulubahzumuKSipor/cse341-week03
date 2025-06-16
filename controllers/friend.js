const mongodb = require("../data/database");
const { isValidFriend } = require("../utilities");
const ObjectId = require("mongodb").ObjectId;

// Controller to handle Friend-related requests
const getAllFriend = async (req, res) => {
  const results = await mongodb.getDb().collection("Friends").find();
  try {
    results.toArray().then((friends) => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(friends);
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getFriendById = async (req, res) => {
  const friendId = new ObjectId(req.params.id);
  const results = await mongodb
    .getDb()
    .collection("Friends")
    .find({ _id: friendId });
  try {
    results.toArray().then((friend) => {
      if (Friend.length > 0) {
        res.setHeader("Content-Type", "application/json");
        res.status(200).json(friend[0]);
      } else {
        res.status(404).json({ message: "Friends not found" });
      }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// const getFriendByUserID = async (req, res) => {
//   const userId = new objectId(req.params.id);

//   try {
//     const results = await mongodb
//       .getDb()
//       .collection("Friends")
//       .find({ userId: { $regex: new RegExp(`^${userId}$`, "i") } })
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

const addFriend = async (req, res) => {
  if (!isValidFriend) {
    return res.status(400).json({ error: "First and last name are required" });
  }
  const newFriend = {
    friend_first_name: req.body.friend_first_name,
    friend_last_name: req.body.friend_last_name,
  };
  try {
    const results = await mongodb
      .getDb()
      .collection("Friends")
      .insertOne(newFriend);
    if (results.acknowledged) {
      res.status(201).json({
        message: "Friend added successfully",
        id: results.insertedId,
      });
    } else {
      res.status(500).json({ error: "Failed to add friend" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateFriend = async (req, res) => {
  const friendId = new ObjectId(req.params.id);
  if (!isValidFriend) {
    return res.status(400).json({ error: "First and Last name are required" });
  }
  if (!ObjectId.isValid(friendId)) {
    return res.status(400).json({ error: "Invalid Friend ID" });
  }
  const updatedFriends = {
    friend_first_name: req.body.friend_first_name,
    friend_last_name: req.body.friend_last_name,
  };
  try {
    const results = await mongodb
      .getDb()
      .collection("Friends")
      .updateOne({ _id: friendId }, { $set: updatedFriends });
    if (results.modifiedCount > 0) {
      res.status(200).json({ message: "Friend updated successfully" });
    } else {
      res.status(404).json({ message: "Friend not found or no changes made" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteFriend = async (req, res) => {
  const friendId = new ObjectId(req.params.id);
  if (!ObjectId.isValid(friendId)) {
    return res.status(400).json({ error: "Invalid Friend ID" });
  }
  try {
    const results = await mongodb
      .getDb()
      .collection("Friends")
      .deleteOne({ _id: friendId });
    if (results.deletedCount > 0) {
      res.status(200).json({ message: "Friend deleted successfully" });
    } else {
      res.status(404).json({ message: "Friend not found" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getAllFriend,
  getFriendById,
  //   getFriendByUser,
  addFriend,
  updateFriend,
  deleteFriend,
};
