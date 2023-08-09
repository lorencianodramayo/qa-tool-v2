const fetch = require("cross-fetch");
const AdmZip = require("adm-zip");
const axios = require("axios");
const { Storage } = require("@google-cloud/storage");
require("dotenv").config();
const { Language } = require("../models/language");
const { TemplateVersion } = require("../models/templateVersion");
const { Variants } = require("../models/variants");
const { SharedVariant } = require("../models/sharedVariants");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const multerStorage = multer.memoryStorage();
const uploadFile = multer({ multerStorage });
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
const storage = new Storage({
  projectId: process.env.GCLOUD_PROJECT_ID,
  credentials: {
    client_email: process.env.GCLOUD_CLIENT_EMAIL,
    private_key: process.env.GCLOUD_PRIVATE_KEY,
  },
});
const bucket = storage.bucket(process.env.GCS_BUCKET);
const getAdlibToken = async (platform) => {
  var details = {
    // username: "ciano@ad-lib.io",
    // password: "W4d1w4dz",
    username: "integrations@ad-lib.io",
    password: "!Integrations2021",
    // username: "denny-marc.maquiling@smartly.io",
    // password: "123456abcdefghiJ",
  };
  // var formBody = [];
  // for (var property in details) {
  //   var encodedKey = encodeURIComponent(property);
  //   var encodedValue = encodeURIComponent(details[property]);
  //   formBody.push(encodedKey + "=" + encodedValue);
  // }
  // formBody = formBody.join("&");
  var loginRequest = await fetch(
    `https://api-${platform}.ad-lib.io/auth/login`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify(details),
    }
  );
  var responseHeaders = loginRequest.headers;
  var responseCookies = responseHeaders.get("set-cookie");
  var loginCookie = responseCookies.substr(
    responseCookies.indexOf("connect.sid=") + 12,
    responseCookies.indexOf(";") -
      (responseCookies.indexOf("connect.sid=") + 12)
  );

  return { status: "ok", data: loginCookie };
};
const getTemplateSelectedVersion = async (req, res) => {
  return getAdlibToken(req.query.platform).then((result) => {
    if (result.status === "ok") {
      fetch(
        `https://api-${req.query.platform}.ad-lib.io/api/v2/assets/templates/${req.query.templateId}?partnerId=${req.query.partnerId}`,
        {
          headers: {
            accept: "*/*",
            "accept-language": "en-US,en;q=0.9",
            "cache-control": "no-cache",
            pragma: "no-cache",
            "sec-ch-ua":
              '"Google Chrome";v="87", " GATool_ConceptStatus";v="99", "Chromium";v="87"',
            "sec-ch-ua-mobile": "?0",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-site",
            cookie: `connect.sid=${result.data};`,
          },
          referrer: `https://${req.query.platform}.ad-lib.io/`,
          referrerPolicy: "strict-origin-when-cross-origin",
          body: null,
          method: "GET",
          mode: "cors",
        }
      )
        .then((response) =>
          response
            .json()
            .then((data) => ({ status: response.status, body: data }))
        )
        .then((obj) => {
          res.json(obj);
        });
    }
  });
};
const getVersions = async (obj, res, platform, result) => {
  var count = 0;
  await obj?.templates?.map((data, index) => {
    if (result.status === "ok") {
      fetch(
        `https://api-${platform}.ad-lib.io/api/v2/assets/templates/${data.generation}/versions?partnerId=${obj.partnerId}`,
        {
          headers: {
            accept: "*/*",
            "accept-language": "en-US,en;q=0.9",
            "cache-control": "no-cache",
            pragma: "no-cache",
            "sec-ch-ua":
              '"Google Chrome";v="87", " GATool_ConceptStatus";v="99", "Chromium";v="87"',
            "sec-ch-ua-mobile": "?0",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-site",
            cookie: `connect.sid=${result.data};`,
          },
          referrer: `https://${platform}.ad-lib.io/`,
          referrerPolicy: "strict-origin-when-cross-origin",
          body: null,
          method: "GET",
          mode: "cors",
        }
      )
        .then((response) =>
          response
            .json()
            .then((data) => ({ status: response.status, body: data }))
        )
        .then((template) => {
          count++;
          obj.templates[index].templateVersion = template.body.versions;
          if (obj.templates.length === count) {
            res.status(200).json({ body: obj });
          }
        });
    }
  });
};
const getPartner = async (cId, platform, res) => {
  return getAdlibToken(platform).then((result) => {
    console.log(result, cId, platform);
    if (result.status === "ok") {
      fetch(
        `https://api-${platform}.ad-lib.io/api/v2/partners/conceptId/${cId}`,
        {
          headers: {
            accept: "*/*",
            "accept-language": "en-US,en;q=0.9",
            "cache-control": "no-cache",
            pragma: "no-cache",
            "sec-ch-ua":
              '"Google Chrome";v="87", " GATool_ConceptStatus";v="99", "Chromium";v="87"',
            "sec-ch-ua-mobile": "?0",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-site",
            cookie: `connect.sid=${result.data};`,
          },
          referrer: `https://${platform}.ad-lib.io/`,
          referrerPolicy: "strict-origin-when-cross-origin",
          body: null,
          method: "GET",
          mode: "cors",
        }
      )
        .then((response) =>
          response
            .json()
            .then((data) => ({ status: response.status, body: data }))
        )
        .then((obj) => res.status(200).json(obj));
    }
  });
};
const getTemplates = async (platform, cId, pId, res) => {
  return getAdlibToken(platform).then((result) => {
    if (result.status === "ok") {
      fetch(
        `https://api-${platform}.ad-lib.io/api/v2/assets/concepts/${cId}?partnerId=${pId}`,
        {
          headers: {
            accept: "*/*",
            "accept-language": "en-US,en;q=0.9",
            "cache-control": "no-cache",
            pragma: "no-cache",
            "sec-ch-ua":
              '"Google Chrome";v="87", " GATool_ConceptStatus";v="99", "Chromium";v="87"',
            "sec-ch-ua-mobile": "?0",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-site",
            cookie: `connect.sid=${result.data};`,
          },
          referrer: `https://${platform}.ad-lib.io/`,
          referrerPolicy: "strict-origin-when-cross-origin",
          body: null,
          method: "GET",
          mode: "cors",
        }
      )
        .then((response) =>
          response
            .json()
            .then((data) => ({ status: response.status, body: data }))
        )
        .then((obj) => {
          getVersions(obj.body, res, platform, result);
        });
      // .then((obj) => res.status(200).json(obj));
    }
  });
};
const getTemplateSelected = async (platform, tId, pId, res) => {
  return getAdlibToken(platform).then((result) => {
    if (result.status === "ok") {
      fetch(
        `https://api-${platform}.ad-lib.io/api/v2/assets/templates/${tId}?partnerId=${pId}`,
        {
          headers: {
            accept: "*/*",
            "accept-language": "en-US,en;q=0.9",
            "cache-control": "no-cache",
            pragma: "no-cache",
            "sec-ch-ua":
              '"Google Chrome";v="87", " GATool_ConceptStatus";v="99", "Chromium";v="87"',
            "sec-ch-ua-mobile": "?0",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-site",
            cookie: `connect.sid=${result.data};`,
          },
          referrer: `https://${platform}.ad-lib.io/`,
          referrerPolicy: "strict-origin-when-cross-origin",
          body: null,
          method: "GET",
          mode: "cors",
        }
      )
        .then((response) =>
          response
            .json()
            .then((data) => ({ status: response.status, body: data }))
        )
        .then((obj) => {
          res.json(obj);
        });
    }
  });
};
const getLanguages = async (req, res) => {
  try {
    const languages = await Language.find();
    return res.status(200).json(languages);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};
const addLanguage = async (req, res) => {
  try {
    // const request = {
    //   parent: `projects/${CREDENTIALS.project_id}/locations/global`,
    //   content: req.content,
    // };
    // const [response] = await translate.detectLanguage(request);
    // let detectLang = null;
    // for (const language of response.languages) {
    detectLang = {
      // code: language.languageCode,
      language: req.language
        .charAt(0)
        .toUpperCase()
        .concat(req.language.slice(1).toLowerCase()),
      content: req.content,
    };
    const languageExists = await Language.findOne({
      // code: detection.language,
      language: req.language,
    });
    if (languageExists === null) {
      const language = new Language(detectLang);
      language.save((err) => {
        if (err) return res.status(500).json({ language: err });
        return res.status(200).json({ language: language });
      });
    } else {
      const language = await Language.findByIdAndUpdate(languageExists._id, {
        content: req.content,
      });
      return res.status(200).json({ language: language });
      // return res.status(500).json({
      //   language: `Language ${languageExists.language
      //     .charAt(0)
      //     .toUpperCase()}${languageExists.language
      //     .slice(1)
      //     .toLowerCase()} Error Added!`,
      // });
    }
    // }
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};
const translate = async (req, res) => {
  try {
    const language = await Language.find({ language: req.language });
    return res.status(200).json({
      translate: language[0].content.substring(0, req.textHeadlineLegal.length),
      length: language[0].content.length,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};
const getTemplatesVersions = async (req, res) => {
  try {
    const tempalateVersion = await TemplateVersion.find();
    return res.status(200).json(tempalateVersion);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};
const batchSize = 1000;
const dataQueue = [];
function enqueueData(data) {
  dataQueue.push(data);
}
function dequeueData() {
  return dataQueue.shift();
}
async function insertDataInBatch() {
  const dataBatch = [];
  while (dataQueue.length > 0 && dataBatch.length < batchSize) {
    const data = dequeueData();
    dataBatch.push(data);
  }
  if (dataBatch.length > 0) {
    try {
      await Variants.insertMany(dataBatch);
      console.log(
        `Inserted ${dataBatch.length} ${new Date()} records into MongoDB`
      );
      Variants.countDocuments({}, (err, count) => {
        if (err) {
          console.error("Error:", err);
        } else {
          console.log("Number of documents:", count);
        }
      });
    } catch (err) {
      console.error("Error inserting data into MongoDB:", err);
    }
  }
}
async function startInsertion() {
  return new Promise(async (resolve, reject) => {
    const interval = 5000;
    const insertionInterval = setInterval(() => {
      insertDataInBatch();
      if (dataQueue.length === 0) {
        clearInterval(insertionInterval);
        resolve("Data insertion completed successfully!");
      }
    }, interval);
  });
}
const postTemplateVersion = async (req, res) => {
  try {
    TemplateVersion.deleteMany({}, (err) => {
      if (err) {
        res.status(500).json(err);
      }
    });
    Variants.deleteMany({}, (err) => {
      if (err) {
        res.status(500).json(err);
      }
    });
    const filteredData1 = req.map((item) => {
      const { ["variants"]: _, ...rest } = item;
      return rest;
    });
    const filteredData2 = req.map((item) => {
      const { ["templateId"]: _, ...rest } = item;
      return rest;
    });
    const dataArray = [];
    TemplateVersion.insertMany(filteredData1, (err, tempalateVersion) => {
      if (err) res.status(500).json(err);
      filteredData2.map((filtData2, i) => {
        const newVariants = filtData2.variants.map((obj) => {
          return { ...obj, templateId: tempalateVersion[i]._id };
        });
        for (let i = 0; i < newVariants.length; i++) {
          dataArray.push(newVariants[i]);
        }
      });
      dataArray.forEach((data) => {
        enqueueData(data);
      });
      startInsertion()
        .then(() => {
          return res.status(200).json({ templatesVersions: tempalateVersion });
        })
        .catch((err) => {
          console.log(err);
          return res.status(500).json(err);
        });
    });
    // delete templatesVersions.template;
    // TemplateVersion.insertMany(templatesVersions, (err, tempalateVersion) => {
    //   if (err) res.status(500).json(error);
    //   else {
    //     res.status(200).json({ templatesVersions: tempalateVersion });
    //     // for (let i = 0; i < tempalateVersion.length; i++) {
    //     //   const templatesVersionsCloud = {
    //     //     template: templatesVersions.template,
    //     //     creativeId: tempalateVersion[i]._id,
    //     //   }
    //     //   postTemplateVersionCloud(templatesVersionsCloud).then((response) =>
    //     //     console.log(response)
    //     //   ).error((error) => console.log(error));
    //     // }
    //   }
    // });
    // const tempalateVersion = new TemplateVersion(templatesVersions);
    // tempalateVersion.insertMany((err) => {
    //   if (err) return res.status(500).json({ templatesVersions: err });
    //   return res.status(200).json({ templatesVersions: tempalateVersion });
    // });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};
const postSharedVariants = async (req, res) => {
  try {
    // SharedVariant.deleteMany({}, (err) => {
    //   if (err) {
    //     res.status(500).json(error);
    //   }
    // });
    const sharedVariant = new SharedVariant({
      variantsName: req.templateName,
      sharedVariants: req.templatesVersions,
    });
    sharedVariant.save((err) => {
      if (err) return res.status(500).json({ language: err });
      return res.status(200).json({ sharedVariants: sharedVariant });
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};
const getSharedVariants = async (req, res) => {
  try {
    const sharedVariants = await SharedVariant.findOne({
      _id: req.params.id,
    });
    res.status(200).json({ sharedVariants: sharedVariants });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};
const postTemplateVersionCloud = async (req, res) => {
  try {
    for (let _template of req) {
      var pendingPromises = [],
        counter = 0,
        isIndexUploaded = false;
      const response = await axios
        .get(_template.templateUrl, {
          responseType: "arraybuffer",
        })
        .catch((err) => err.response);
      const zip = new AdmZip(response.data);
      for (let entry of zip.getEntries()) {
        pendingPromises.push(
          new Promise((resolve, reject) => {
            // if (entry.name === "adlib.css") {
            //   let fileContent = entry.getData().toString("utf8");
            //   fileContent = fileContent.replace(
            //     /\.mainContent\s*{([\s\S]*?)}/g,
            //     "/* .mainContent {$1/*/"
            //   );
            //   fileContent += `
            //     .mainContent {
            //       position: absolute;
            //       overflow:visible;
            //       transform: perspective(1920px) matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
            //       opacity:0;
            //       background-color: white;
            //     }
            //   `;
            //   entry.setData(Buffer.from(fileContent, "utf8"));
            // }
            if (entry.name === "adlibUtils-v3.js") {
              let fileContent = entry.getData().toString("utf8");
              fileContent = fileContent.replace(
                /if \(defaultValues\[elems\[i\]\.getAttribute\('adlib-image'\)\]\.length != undefined\)/g,
                "if (defaultValues[elems[i].getAttribute('adlib-image')] != undefined)"
              );
              entry.setData(Buffer.from(fileContent, "utf8"));
            }
            if (entry.name === "index.html") {
              entry.setData(
                Buffer.from(
                  // .join(
                  //   `<script src="${req.origin}preview/lib.js"></script></html>`
                  // ),
                  entry.getData().toString("utf8").split("</html>")
                    .join(`<script>
                      window.addEventListener("message", (event) => {
                        if (typeof event.data.data === "object") {
                          defaultValues = event.data.data;
                        } else {
                          if (event.data.data === "pause") {
                            gwd.auto_PauseBtnClick();
                          } else {
                            gwd.auto_PlayBtnClick();
                          }
                        }
                      }, false);
                    </script></html>`),
                  "utf8"
                )
              );
            }
            bucket
              .file(`${_template.creativeId}/${entry.entryName}`)
              .createWriteStream()
              .on("error", (err) => reject(err))
              .on("finish", () => {
                resolve(entry.entryName);
              })
              .end(entry.getData());
          })
        );
      }
    }
    const final = Promise.all(pendingPromises)
      .then((names) =>
        names.length === zip.getEntries().length ? true : false
      )
      .catch((err) => err);
    res.status(200).json(final);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
const postTemplateVersionImageVideoCloud = async (req, res) => {
  try {
    const fieldnameParser = multer({}).any();
    fieldnameParser(req, res, async (err) => {
      if (err) {
        console.error(err);
      }
      let pendingAssetPromises = [];
      const files = req.body.files;
      Object.keys(files).forEach((key1) => {
        const fileIdv1 = files[key1].creativeId;
        Object.keys(files[key1].files).forEach((key2) => {
          const nestedFile = files[key1].files[key2];
          const fileIdv2 = nestedFile.dynamicElementKey;
          for (const key in req.files) {
            if (
              req.files[key]["fieldname"] ===
              `files[${fileIdv1}][files][${fileIdv2}][fileData]`
            ) {
              if (fileIdv1) {
                pendingAssetPromises.push(
                  new Promise((resolve, reject) => {
                    const uploadedFile = req.files[key];
                    const destinationFileName = `${fileIdv1}/asset/${fileIdv2}/${uploadedFile.originalname}`;
                    const fileBuffer = uploadedFile.buffer;
                    const file = bucket.file(destinationFileName);
                    const writeStream = file.createWriteStream({
                      resumable: false,
                      gzip: true,
                    });
                    writeStream
                      .on("error", (error) => {
                        console.error("Error uploading files:", error);
                      })
                      .on("finish", () => {
                        console.log("Files uploaded successfully.");
                      })
                      .end(fileBuffer);
                  })
                );
              }
            }
          }
        });
      });
      const finalAsset = Promise.all(pendingAssetPromises)
        .then((names) => true)
        .catch((err) => err);
      res.status(200).json(finalAsset);
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
const getVariants = async (req, res) => {
  try {
    Variants.find({})
      .limit(101)
      .exec((err, variants) => {
        if (err) {
          res.status(500).json(err);
          return;
        }
        return res.status(200).json(variants);
      });
    // const variants = await Variants.find();
    // return res.status(200).json(variants);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
module.exports = {
  getPartner,
  getTemplates,
  getTemplateSelected,
  getLanguages,
  addLanguage,
  translate,
  getTemplatesVersions,
  postTemplateVersion,
  postSharedVariants,
  getSharedVariants,
  postTemplateVersionCloud,
  getTemplateSelectedVersion,
  postTemplateVersionImageVideoCloud,
  getVariants,
};
