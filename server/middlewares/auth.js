module.exports.isUserAuthenticated = (req, res, next) => {
  if (req.cookies.remember_me) next();
  else res.status(401).json("You must login first!");
};
