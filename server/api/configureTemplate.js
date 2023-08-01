const express = require("express");
const axios = require("axios");
const AdmZip = require("adm-zip");
const router = express.Router();
require("dotenv").config();
function removeUnwantedContent(inputString) {
  const urlPattern = /https?:\/\/[^\s/$.?#].[^\s]*/g;
  const preservedUrls = inputString.match(urlPattern) || [];
  inputString = inputString.replace(urlPattern, "<URL_PLACEHOLDER>");
  const commentPattern = /\/\/.*$|\/\*[\s\S]*?\*\//gm;
  const curlyBracePattern = /[{}]/g;
  const whitespacePattern = /\s{2,}/g;
  const newlinePattern = /\n{2,}/g;
  inputString = inputString
    .replace(curlyBracePattern, "")
    .replace(commentPattern, "")
    .replace(whitespacePattern, " ")
    .replace(newlinePattern, "\n");
  inputString = inputString.replace(/<URL_PLACEHOLDER>/g, () =>
    preservedUrls.shift()
  );
  return inputString.trim();
}
router.post("/template/defaultValues", async (req, res) => {
  try {
    let templateDefaultValues = [];
    for (let template of req.body) {
      const response = await axios
        .get(template.url, {
          responseType: "arraybuffer",
        })
        .catch((err) => err.response);
      const zip = new AdmZip(response.data);
      for (let entry of zip.getEntries()) {
        if (entry.name === "index.html") {
          const targetVariable = "defaultValues";
          const htmlContent = entry.getData().toString("utf8");
          const scriptTagRegex = /<script\b[^>]*>([\s\S]*?)<\/script>/gm;
          const scriptTagMatches = htmlContent.match(scriptTagRegex);
          if (scriptTagMatches) {
            const allScriptContent = scriptTagMatches.join("\n");
            const regex = new RegExp(
              `\\bvar\\s+${targetVariable}\\s*=\\s*({[^}]*})`
            );
            const match = allScriptContent.match(regex);
            const extractedObject = match[1];
            let defaultValues = {};
            removeUnwantedContent(extractedObject)
              .split(",")
              .map((object) => {
                if (object.includes(":")) {
                  defaultValues[object.replace(/\s/g, "").split(":")[0]] =
                    object.split(":")[1].replace(/['"]/g, "");
                }
              });
            templateDefaultValues.push({
              templateId: template._id,
              defaultValues: defaultValues,
            });
          }
        }
      }
    }
    res.status(200).json({
      data: templateDefaultValues,
    });
  } catch (error) {
    res.status(500).json({ data: null, message: error });
  }
});
module.exports = router;
