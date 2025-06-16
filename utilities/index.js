const isValidUser = (user) => {
  return (
    user.firstName &&
    user.lastName &&
    user.email &&
    user.username &&
    user.phone &&
    user.country &&
    user.city
  );
};

const isValidLocation = (location) => {
  return location.Country && location.City;
};

const isValidFriend = (friend) => {
  return friend.friend_first_name && friend.friend_last_name;
};

const isValidHobby = (hobby) => {
  return hobby.hobby && hobby.type && hobby.frequency && hobby.ranking;
};

const isValidObjectId = (id) => {
  const ObjectId = require("mongodb").ObjectId;
  return ObjectId.isValid(id);
};

module.exports = {
  isValidUser,
  isValidLocation,
  isValidObjectId,
  isValidFriend,
  isValidHobby,
};
