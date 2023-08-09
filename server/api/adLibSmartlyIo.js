const express = require("express");
const router = express.Router();
const adLibSmartlyIo = require("../helpers/adLibSmartlyIo");
const { Variants } = require("../models/variants");
// const multer = require('multer');
// const storage = multer.memoryStorage();
// const upload = multer({ storage });
router.post("/getPartnerId", async (req, res) => {
  await adLibSmartlyIo.getPartner(req.body.conceptId, req.body.platform, res);
});
router.post("/getTemplates", async (req, res) => {
  await adLibSmartlyIo.getTemplates(
    req.body.platform,
    req.body.conceptId,
    req.body.partnerId,
    res
  );
});
router.get("/languages", async (req, res) => {
  await adLibSmartlyIo.getLanguages(req, res);
});
router.post("/addLanguage", async (req, res) => {
  await adLibSmartlyIo.addLanguage(req.body, res);
});
router.post("/translate/v2", async (req, res) => {
  await adLibSmartlyIo.translate(req.body, res);
});
router.get("/getTemplatesVersions", async (req, res) => {
  await adLibSmartlyIo.getTemplatesVersions(req.body, res);
});
router.post("/postTemplateVersion", async (req, res) => {
  await adLibSmartlyIo.postTemplateVersion(req.body, res);
});
router.post("/postSharedVariants", async (req, res) => {
  await adLibSmartlyIo.postSharedVariants(req.body, res);
});
router.get("/getSharedVariants/:id", async (req, res) => {
  await adLibSmartlyIo.getSharedVariants(req, res);
});
router.post("/postTemplateVersionCloud", async (req, res) => {
  await adLibSmartlyIo.postTemplateVersionCloud(req.body, res);
});
router.get("/getTemplateSelectedVersion", async (req, res) => {
  await adLibSmartlyIo.getTemplateSelectedVersion(req, res);
});
// router.post("/postTemplateVersionImageCloud", upload.single('file'), async (req, res) => {
//   await adLibSmartlyIo.postTemplateVersionImageVideoCloud(req, res);
// });
// router.post("/postTemplateVersionVideoCloud", upload.single('video'), async (req, res) => {
//   await adLibSmartlyIo.postTemplateVersionImageVideoCloud(req, res);
// });
router.post("/postTemplateVersionImageVideoCloud", async (req, res) => {
  await adLibSmartlyIo.postTemplateVersionImageVideoCloud(req, res);
});
router.get("/getVariants", async (req, res) => {
  await adLibSmartlyIo.getVariants(req, res);
});
router.get("/variants", async (req, res) => {
  const { page, pageSize } = req.query;
  const skip = (page - 1) * pageSize;
  const records = await Variants.find().skip(skip).limit(parseInt(pageSize));
  const totalRecords = await Variants.countDocuments();
  const totalPages = Math.ceil(totalRecords / pageSize);
  res.status(200).json({ records, totalPages });
});
module.exports = router;
