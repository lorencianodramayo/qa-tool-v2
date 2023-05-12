const express = require("express");
const { User } = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const passport = require("passport");
const router = express.Router();
// router.
// post(
//   "/signin",
//   passport.authenticate("local", {
//     failureRedirect: "http://localhost:5173/signin",
//   }),
//   async (req, res) => {
//     const user = await User.findOne({ email: req.user.email });
//     if (await bcrypt.compare(req.body.password, user.password)) {
//       console.log("Login route!  Authenticated?:", req.isAuthenticated());
//       const token = jwt.sign({ email: req.body.email }, process.env.JWT_SECRET);
//       if (res.status(200)) {
//         return res.status(200).json({ success: true, user, token });
//       } else {
//         return res.status(400).json({ success: false, err });
//       }
//     }
//     return res
//       .status(400)
//       .json({ success: false, user: user, error: "Invalid credentials!" });
//     // const user = await User.findOne({ email: req.body.email });
//     // if (user === null) {
//     //   return res
//     //     .status(400)
//     //     .json({ success: false, user: user, error: "User does not exists!" });
//     // } else {
//     //   if (await bcrypt.compare(req.body.password, user.password)) {
//     //     const token = jwt.sign(
//     //       { email: req.body.email },
//     //       process.env.JWT_SECRET
//     //     );
//     //     if (res.status(200)) {
//     //       return res.status(200).json({ success: true, user, token });
//     //     } else {
//     //       return res.status(400).json({ success: false, err });
//     //     }
//     //   }
//     //   return res
//     //     .status(400)
//     //     .json({ success: false, user: user, error: "Invalid credentials!" });
//     // }
//   }
// );
router.post("/signin", (req, res, next) => {
  const { email, password, remember } = req.body;
  passport.authenticate("local", { session: true }, function (err, user) {
    if (err) {
      return res.status(400).json({ err });
    }
    req.login(user, async () => {
      if (remember) res.cookie('remember_me', true, { maxAge: 24 * 60 * 60 * 1000, httpOnly: true });
      res.status(200).json({ user });
    });
  })(req, res, next);
});

module.exports = router;
