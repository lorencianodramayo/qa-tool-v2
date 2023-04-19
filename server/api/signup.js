const express = require("express");
const { User } = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const router = express.Router();

router.post("/signup", async (req, res) => {
  const oldUser = await User.findOne({ email: req.body.email });
  if (req.body.token !== "undefined") {
    if (oldUser !== null) {
      return res
        .status(400)
        .json({ success: false, user: oldUser, error: "User exists!" });
    } else {
      req.body["password"] = await bcrypt.hash(req.body.password, 10);
      const user = new User(req.body);
      user.save((err) => {
        if (err) return res.status(400).json({ success: false, err });
        return res.status(200).json({ success: true, user });
      });
    }
  } else {
    jwt.verify(req.body.token, process.env.JWT_SECRET, async (err) => {
      if (err === null) {
        if (oldUser !== null) {
          return res
            .status(400)
            .json({ success: false, user: oldUser, error: "User exists!" });
        } else {
          req.body["password"] = await bcrypt.hash(req.body.password, 10);
          const user = new User(req.body);
          user.save((err) => {
            if (err) return res.status(400).json({ success: false, err });
            return res.status(200).json({ success: true, user });
          });
        }
      } else
        return res
          .status(400)
          .json({ success: false, error: err.name + " " + err.message });
    });
  }
});

module.exports = router;
