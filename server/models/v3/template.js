const { default: mongoose } = require("mongoose");
const Schema = mongoose.Schema;
const TemplateSchema = new Schema({
  name: String,
  template: Object,
  path: String,
  date: {
    type: String,
    default: Date.now(),
  },
});
module.exports = {
  Template: mongoose.model("template", TemplateSchema),
};
