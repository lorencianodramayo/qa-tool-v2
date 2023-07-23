const express = require("express");
const signUpApi = require("./signup");
const signInApi = require("./signin");
const loginWithGoogleApi = require("./loginWithGoogle");
const userApi = require("./user");
const configureTemplateApi = require("./configureTemplate");
const adLibSmartlyIoApi = require("./adLibSmartlyIo");
// v3
const uploadAPI = require("./v3/upload");
const templateAPI = require("./v3/template");
const languageAPI = require("./v3/language");

const router = express.Router();

router.use(signUpApi);
router.use(signInApi);
router.use(loginWithGoogleApi);
router.use(userApi);
router.use(configureTemplateApi);
router.use(adLibSmartlyIoApi);
// v3
router.use(uploadAPI);
router.use(templateAPI);
router.use(languageAPI);

module.exports = router;
