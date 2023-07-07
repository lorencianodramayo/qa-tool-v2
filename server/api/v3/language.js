const express = require("express");
const router = express.Router();
const { Language } = require("../../models/v3/language");
router.get("/languages/v3", async (req, res) => {
  try {
    const languages = await Language.find();
    console.log(languages);
    res.status(200).json(languages);
  } catch (error) {
    res.status(500).json(error);
  }
});
router.get("/language/v3/:_id", async (req, res) => {
  try {
    const language = await Language.find({ _id: req.params._id });
    res.status(200).json(language);
  } catch (error) {
    res.status(500).json(error);
  }
});
router.post("/language/v3", async (req, res) => {
  try {
    detectLang = {
      language: req.body.language
        .charAt(0)
        .toUpperCase()
        .concat(req.body.language.slice(1).toLowerCase()),
      content: req.body.content,
    };
    const languageExists = await Language.findOne({
      language: req.body.language
        .charAt(0)
        .toUpperCase()
        .concat(req.body.language.slice(1).toLowerCase()),
    });
    if (languageExists === null) {
      const language = new Language(detectLang);
      language.save((err) => {
        if (err) res.status(500).json({ language: err });
        res.status(200).json({ language: language, success: true });
      });
    } else {
      const language = await Language.findByIdAndUpdate(languageExists._id, {
        content: req.body.content,
      });
      res.status(200).json({ language: language, success: false });
    }
  } catch (error) {
    res.status(500).json(error);
  }
});
router.put("/language/v3/:language", async (req, res) => {
  const _id = req.params.language;
  const { language, content } = req.body;
  Language.findByIdAndUpdate(
    _id,
    { language, content },
    { new: true, runValidators: true }
  )
    .then((updatedLanguage) => {
      if (updatedLanguage) {
        res.status(200).json({ language: updatedLanguage });
      } else {
        return res.status(404).json({ language: language });
      }
    })
    .catch((error) => {
      res.status(500).json(error);
    });
});
router.delete("/language/v3/:language", async (req, res) => {
  try {
    const language = await Language.findByIdAndDelete(req.params.language);
    if (!language) {
      return res.status(404).json({ language: language });
    }
    res.status(200).json({ language: language });
  } catch (error) {
    res.status(500).json(error);
  }
});
module.exports = router;
