const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const { User } = require("../models/user");
const GOOGLE_CALLBACK_URL = "http://localhost:5000/api/v1/auth/google/callback";
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: GOOGLE_CALLBACK_URL,
      passReqToCallback: true,
    },
    async (req, accessToken, refreshToken, profile, cb) => {
      const defaultUser = {
        fullName: `${profile.name.givenName} ${profile.name.familyName}`,
        email: profile.emails[0].value,
        picture: profile.photos[0].value,
        googleId: profile.id,
      };
      const user = await User.findOneAndUpdate(
        { googleId: profile.id },
        defaultUser,
        {
          new: true,
          upsert: true,
        }
      ).catch((err) => {
        console.log("Error signing up", err);
        cb(err, null);
      });
      const googleUser = {
        id: user["_id"].toString().replace(/ObjectId\("(.*)"\)/, "$1"),
        email: user["email"],
        fullName: user["fullName"],
        googleId: user["googleId"],
        picuture: user["picture"],
      };
      if (googleUser) return cb(null, googleUser);
    }
  )
);
passport.serializeUser((user, cb) => {
  cb(null, user.id);
});
passport.deserializeUser(async (id, cb) => {
  const user = await User.findOne({ _id: id }).catch((err) => {
    cb(err, null);
  });
  if (user) cb(null, user);
});
