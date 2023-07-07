const express = require("express");
const Multer = require("multer");
const { Storage } = require("@google-cloud/storage");
const AdmZip = require("adm-zip");
const router = express.Router();
const { Template } = require("../../models/v3/template");
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
const bucket = storage.bucket(process.env.GCS_BUCKET);
router.post("/upload", multer.single("file"), (req, res) => {
  let zip = new AdmZip(req.file.buffer);
  let entries = zip.getEntries();
  let template = {};
  let promises = [];
  entries.forEach(function (entry) {
    if (!entry?.isDirectory) {
      if (entry?.name === "dynamic.js") {
        //  get object template
        eval(
          "var test = " +
            entry?.getData()?.toString("utf8")?.split("var")[1]?.split("=")[1]
        );

        template = test;
      }
    }
  });
  if (Object.keys(template).length > 0) {
    const newTemplate = new Template({
      name: req.file.originalname.split(".zip")[0],
      template,
      path: process.env.GCS_BUCKET,
    });
    newTemplate
      .save()
      .then((data) => {
        entries.forEach(function (entry) {
          if (!entry?.isDirectory) {
            if (entry?.name === "index.html") {
              entry.setData(
                Buffer.from(
                  entry?.getData()?.toString("utf8")?.split("</html>")[0] +
                    `<script>
                      window.addEventListener("message",
                      (event) => {
                          if(typeof event.data === "object"){
                              defaultValues = event.data
                          }else{
                            if(event.data === "pause"){
                              gwd.auto_PauseBtnClick();
                            }else{
                              gwd.auto_PlayBtnClick();
                            }
                          }
                      },
                      false
                  );
                  </script></html>`,
                  "utf8"
                )
              );
            }
            const promise = new Promise((resolve, reject) => {
              let file = bucket.file(
                `${data?.id}/${req.file.originalname.split(".zip")[0]}/${
                  entry.name
                }`
              );
              let fileStream = file.createWriteStream();

              fileStream.on("error", (err) =>
                TemplateModel.findByIdAndDelete(data?.id).then(() => {
                  res
                    .status(500)
                    .json({ data: null, success: false, message: err });
                  reject(`Unable to upload image, something went wrong`);
                })
              );

              fileStream.on("finish", () => {
                resolve(
                  `${data?.id}/${req.file.originalname.split(".zip")[0]}/${
                    entry.name
                  }`
                );
              });

              fileStream.end(entry.getData());
            });
            promises.push(promise);
          }
        });
        Promise.all(promises).then((promise) => {
          return res.status(200).json({
            data: data?.id,
            success: true,
            message: "Uploaded Successfully!",
          });
        });
      })
      .catch((err) =>
        res.status(500).json({ data: null, success: false, message: err })
      );
  }
});
module.exports = router;
