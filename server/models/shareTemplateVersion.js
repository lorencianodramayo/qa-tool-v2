const { default: mongoose } = require("mongoose");

const Schema = mongoose.Schema;

const VariantSchema = new Schema({
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
  { _id: false });

const TemplateVersionSchema = new Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
  },
  templateId: {
    type: String,
  },
  variants: [VariantSchema],
}, { _id: false });

const ShareTemplateVersiontSchema = new Schema({
  shareTemplatesVersions: [TemplateVersionSchema],
});

module.exports = {
  ShareTemplateVersion: mongoose.model("shareTemplateVersion", ShareTemplateVersiontSchema),
};
