const express = require("express");
const Multer = require("multer");
const { Storage } = require("@google-cloud/storage");
const router = express.Router();
const { Template } = require("../../models/v3/template");
const { Language } = require("../../models/v3/language");
const { TemplateVersion } = require("../../models/v3/templateVersion");
require("dotenv").config();
const storage = new Storage({
  projectId: process.env.GCLOUD_PROJECT_ID,
  credentials: {
    client_email: process.env.GCLOUD_CLIENT_EMAIL,
    private_key: process.env.GCLOUD_PRIVATE_KEY,
  },
});
const multer = Multer({
  storage: Multer.memoryStorage(),
  limits: {
    fileSize: 10000 * 1024 * 1024,
  },
});
router.get("/template", async (req, res) => {
  Template.findById(req?.query?.id)
    .then((response) =>
      res
        .status(200)
        .json({ data: response, success: true, message: "Template found!" })
    )
    .catch((err) =>
      res.status(500).json({ data: null, success: false, message: err })
    );
});
router.post("/translate/v3", async (req, res) => {
  Language.find({ language: req.body.language })
    .then((response) =>
      res
        .status(200)
        .json({ data: response[0].content.substring(0, req.body.text.length) })
    )
    .catch((err) =>
      res.status(500).json({ data: null, success: false, message: err })
    );
});
router.post("/template/upload", multer.single("file"), async (req, res) => {
  if (!req.file) {
    res.status(400).json({ error: "No file uploaded." });
    return;
  }
  const bucket = storage.bucket("creative-templates");
  const file = bucket.file(`${req.body.id}/assets/${req.file.originalname}`);
  const blobStream = file.createWriteStream();
  blobStream.on("error", (err) => {
    res.status(500).json({ data: null, success: false, message: err });
  });
  blobStream.on("finish", () => {
    const publicUrl = `https://storage.googleapis.com/creative-templates/${file.name}`;
    res.status(200).json({ data: publicUrl });
  });
  blobStream.end(req.file.buffer);
});
router.post("/template/versions", async (req, res) => {
  const templateVersion = new TemplateVersion(req.body);
  templateVersion.save((err) => {
    if (err) res.status(500).json({ templateVersion: err });
    res.status(200).json({ templateVersion: templateVersion, success: true });
  });
});
router.get("/template/versions/:id", async (req, res) => {
  TemplateVersion.find({ templateId: req.params.id }, (err, response) => {
    if (err) res.status(500).json({ data: null, success: false, message: err });
    else {
      if (response.length === 0)
        res.status(200).json({
          data: null,
          success: true,
          message: "Template Version not found!",
        });
      else
        res.status(200).json({
          data: response,
          success: true,
          message: "Template Version found!",
        });
    }
  });
});
module.exports = router;
