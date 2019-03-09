const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const expressValidator = require("express-validator");
const session = require("express-session");
const passport = require("passport");
const config = require("./config/database");

// Connect to db
mongoose.connect(config.database, { useNewUrlParser: true });
let db = mongoose.connection;

// Check db connection
db.once("open", () => {
  console.log("Connected to MongoDB...");
});

// Check db errors
db.on("error", err => {
  console.log(err);
});

// Init app
const app = express();

// Load View Engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

// Body Parser Middleware
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

// Set public folder
app.use(express.static(path.join(__dirname, "public")));

// Express Session Middleware
app.use(
  session({
    secret: "keyboard cat",
    resave: true,
    saveUninitialized: true
  })
);

// Express Messages Middleware
app.use(require("connect-flash")());
app.use(function(req, res, next) {
  res.locals.messages = require("express-messages")(req, res);
  next();
});

// Express Validator Middleware
app.use(
  expressValidator({
    errorFormatter: function(param, msg, value) {
      var namespace = param.split("."),
        root = namespace.shift(),
        formParam = root;

      while (namespace.length) {
        formParam += "[" + namespace.shift() + "]";
      }
      return {
        param: formParam,
        msg: msg,
        value: value
      };
    }
  })
);

// Passport Config
require("./config/passport")(passport);

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

// Global User variable
app.get("*", (req, res, next) => {
  res.locals.user = req.user || null;
  next();
});

// Route Admin File
let admin = require("./routes/admin/admin");
let explore = require("./routes/explore");
let api = require("./routes/api");
app.use("/admin", admin);
app.use("/", explore);
app.use("/api", api);

// Start Server
app.listen(3000, () => {
  console.log("Server has started...");
});
