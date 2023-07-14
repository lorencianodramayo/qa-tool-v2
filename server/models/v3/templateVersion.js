const { default: mongoose } = require("mongoose");

const Schema = mongoose.Schema;

const VariantSchema = new Schema(
  {
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

const TemplateVersionSchema = new Schema({
  templateId: {
    type: String,
  },
  variants: [VariantSchema],
});

module.exports = {
  TemplateVersion: mongoose.model("templatesVersionsv3", TemplateVersionSchema),
};
