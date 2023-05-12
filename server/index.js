const express = require("express");
const cookieParser = require('cookie-parser');
const cookieSession = require("cookie-session");
const cors = require("cors");
const morgan = require("morgan");

const mongoose = require("mongoose");
const passport = require("passport");
const path = require("path");


const api = require("./api");
const app = express();

require("dotenv").config();

require("./auth/passportGoogleSSO");
require("./models/user");
require("./auth/passportLocal")(passport);

const PORT = process.env.PORT || 5000;

// Step 1 DB connection
mongoose.set("strictQuery", false);

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
  console.log("Mongoose is connected!!!!");
});

// Data parsing

app.use(express.json({ limit: "100mb" }));
app.use(cookieParser());
app.use(
  cors({
    allowedHeaders: ["sessionId", "Content-Type"],
    exposedHeaders: ["sessionId"],
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
  })
);

app.use(express.urlencoded({ limit: "100mb", extended: false }));

app.use(
  cookieSession({
    name: 'session',
    maxAge: 24 * 60 * 60 * 1000,
    keys: [process.env.COOKIE_KEY],
  })
);

app.use(passport.initialize());
app.use(passport.session());

// Step 3: Initialization
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/dist"));
}

// Step 4: HTTP request logger
app.use(morgan("tiny"));

// Step 5: API Routes
app.use("/api/v1", api);

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/dist", "index.html"));
});

app.listen(PORT, console.log(`Server is starting at ${PORT}`));
