const { default: mongoose } = require("mongoose");

const Schema = mongoose.Schema;

const LanguageSchema = new Schema({
  // code: {
  //   type: String,
  // },
  language: {
    type: String,
  },
  content: {
    type: String,
  },
});

module.exports = {
  Language: mongoose.model("languages", LanguageSchema),
};
