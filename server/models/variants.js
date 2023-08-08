const { default: mongoose } = require("mongoose");

const Schema = mongoose.Schema;

const VariantsSchema = new Schema(
  {
    templateId: {
      type: String,
    },
    templateName: {
      type: String,
    },
    size: {
      type: String,
    },
    variantName: {
      type: String,
    },
    defaultValues: {
      type: Object,
    },
  },
  { _id: false }
);

module.exports = {
  Variants: mongoose.model("variants", VariantsSchema),
};
