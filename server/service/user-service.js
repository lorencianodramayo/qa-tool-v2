const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const UserModel = mongoose.model("users");

const HASH_SALT = 15;

const UserService = {
  getById: (id) => {
    return UserModel.findById(id);
  },

  getOneByField: (fieldName, fieldValue) => {
    return UserModel.findOne({ [fieldName]: fieldValue });
  },
};

module.exports = UserService;
