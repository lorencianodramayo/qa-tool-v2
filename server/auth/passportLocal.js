const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const UserService = require("../service/user-service");
module.exports = function (passport) {
  passport.serializeUser(function (user, done) {
    done(null, user._id);
  });
  passport.deserializeUser(async function (id, done) {
    await UserService.getById(id)
      .then((res) => {
        done(null, res);
      })
      .catch((err) => done(err, null));
  });
  passport.use(
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true,
      },
      async function (req, email, password, done) {
        const user = await UserService.getOneByField("email", email);
        if (!user) {
          return done("Invalid credentials", false);
        }
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
          return done("Invalid credentials", false);
        }
        return done(null, user);
      }
    )
  );
};
