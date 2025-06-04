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

const isValidObjectId = (id) => {
  const ObjectId = require("mongodb").ObjectId;
  return ObjectId.isValid(id);
};

module.exports = {
  isValidUser,
  isValidLocation,
  isValidObjectId,
};
