const express = require("express");
const Multer = require("multer");
const xlsx = require("xlsx");
const router = express.Router();
require("dotenv").config();
const { Language } = require("../models/language");
const multer = Multer({
  storage: Multer.memoryStorage(),
  limits: {
    fileSize: 10000 * 1024 * 1024,
  },
});
router.get("/element/languages", async (req, res) => {
  try {
    const languages = await Language.find();
    return res.status(200).json(languages);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
});
router.post("/element/upload/xlsx", multer.single("file"), async (req, res) => {
  try {
    const fileContent = req.file.buffer;
    const workbook = xlsx.read(fileContent);
    const worksheet = workbook.Sheets["Language"];
    const urlRegex = new RegExp("^https?://", "i");
    const languages = [];
    for (const cellAddress in worksheet) {
      if (
        cellAddress.startsWith("A") &&
        worksheet.hasOwnProperty(cellAddress)
      ) {
        const value = worksheet[cellAddress].v;
        const columnBAddress = "B" + cellAddress.substring(1);
        if (worksheet.hasOwnProperty(columnBAddress)) {
          const valueInColumnB = worksheet[columnBAddress].v;
          if (
            valueInColumnB !== null &&
            valueInColumnB !== undefined &&
            valueInColumnB !== "" &&
            !urlRegex.test(valueInColumnB)
          ) {
            languages.push({ language: value, content: valueInColumnB });
          }
        }
      }
    }
    Language.deleteMany({}, (err) => {
      if (err) {
        res.status(500).json(error);
      }
    });
    Language.create(languages, (err, savedLanguages) => {
      if (err) res.status(500).json({ data: null, message: err });
      else res.status(200).json({ data: savedLanguages, message: null });
    });
  } catch (error) {
    res.status(500).json({ data: null, message: error });
  }
});
module.exports = router;
