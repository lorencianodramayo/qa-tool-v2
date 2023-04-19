const { default: mongoose } = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  fullName: {
    type: String,
  },
  googleId: {
    type: String,
  },
  picture: {
    type: String,
  },
});

module.exports = {
  User: mongoose.model("users", UserSchema),
};
