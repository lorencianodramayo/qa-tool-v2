const fetch = require("cross-fetch");
const AdmZip = require("adm-zip");
const axios = require("axios");
const { Storage } = require("@google-cloud/storage");
require("dotenv").config();
const { Language } = require("../models/language");
const { TemplateVersion } = require("../models/templateVersion");
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
  };
  var formBody = [];
  for (var property in details) {
    var encodedKey = encodeURIComponent(property);
    var encodedValue = encodeURIComponent(details[property]);
    formBody.push(encodedKey + "=" + encodedValue);
  }
  formBody = formBody.join("&");
  var loginRequest = await fetch(
    `https://api-${platform}.ad-lib.io/auth/login`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      },
      body: formBody,
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
    return res.status(400).json(error);
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
        if (err) return res.status(400).json({ language: err });
        return res.status(200).json({ language: language });
      });
    } else {
      const language = await Language.findByIdAndUpdate(languageExists._id, {
        content: req.content,
      });
      return res.status(200).json({ language: language });
      // return res.status(400).json({
      //   language: `Language ${languageExists.language
      //     .charAt(0)
      //     .toUpperCase()}${languageExists.language
      //     .slice(1)
      //     .toLowerCase()} Error Added!`,
      // });
    }
    // }
  } catch (error) {
    return res.status(400).json(error);
  }
};
const translate = async (req, res) => {
  try {
    const language = await Language.find({ language: req.language });
    return res.status(200).json({
      translate: language[0].content.substring(0, req.textHeadlineLegal.length),
    });
  } catch (error) {
    return res.status(400).json(error);
  }
};
const getTemplatesVersions = async (req, res) => {
  try {
    const tempalateVersion = await TemplateVersion.find();
    return res.status(200).json(tempalateVersion);
  } catch (error) {
    return res.status(400).json(error);
  }
};
const postTemplateVersion = async (req, res) => {
  try {
    templatesVersions = {
      templateId: req.templateId,
      variants: req.variants,
    };
    TemplateVersion.deleteMany({}, (err) => {
        if (err) {
            res.status(500).send({error: err});           
        }
    });
    const tempalateVersion = new TemplateVersion(templatesVersions);
    tempalateVersion.save((err) => {
      if (err) return res.status(400).json({ templatesVersions: err });
      return res.status(200).json({ templatesVersions: tempalateVersion });
    });
  } catch (error) {
    return res.status(400).json(error);
  }
};
const postTemplateVersionCloud = async (req, res) => {
  try {
    var pendingPromises = [],
      counter = 0,
      isIndexUploaded = false;
    const response = await axios
      .get(req.template, {
        responseType: "arraybuffer",
      })
      .catch((err) => err.response);
    const zip = new AdmZip(response.data);
    for (let entry of zip.getEntries()) {
      pendingPromises.push(
        new Promise((resolve, reject) => {
          if (entry.name === "index.html") {
            entry.setData(
              Buffer.from(
                // .join(
                //   `<script src="${req.origin}preview/lib.js"></script></html>`
                // ),
                entry.getData().toString("utf8").split("</html>").join(`<script>
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
            .file(`${req.creativeId}/${entry.entryName}`)
            .createWriteStream()
            .on("error", (err) => reject(err))
            .on("finish", () => {
              resolve(entry.entryName);
            })
            .end(entry.getData());
        })
      );
    }
    const final = Promise.all(pendingPromises)
      .then((names) =>
        names.length === zip.getEntries().length ? true : false
      )
      .catch((err) => err);
    return res.status(200).json({ final: final });
  } catch (error) {
    return res.status(400).json(error);
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
  postTemplateVersionCloud,
};
