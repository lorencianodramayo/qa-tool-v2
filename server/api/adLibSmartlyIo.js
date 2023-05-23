const express = require("express");
const router = express.Router();
const adLibSmartlyIo = require("../helpers/adLibSmartlyIo");
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
router.post("/translate", async (req, res) => {
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
})
router.post("/postTemplateVersionCloud", async (req, res) => {
  await adLibSmartlyIo.postTemplateVersionCloud(req.body, res);
});
router.get("/getTemplateSelectedVersion", async (req, res) => {
  await adLibSmartlyIo.getTemplateSelectedVersion(req, res);
});
module.exports = router;
