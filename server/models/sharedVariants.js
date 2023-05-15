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

const SharedVariantSchema = new Schema({
  variantsName: {
    type: String,
  },
  sharedVariants: [TemplateVersionSchema],
});

module.exports = {
  SharedVariant: mongoose.model("sharedVariant", SharedVariantSchema),
};
