// Env
require("dotenv").config();
const express = require("express");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");
const Users = require("./models/account-schema");
//const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");
const dburi = process.env.DBURI;
const port = process.env.PORT;

// Password encrytpion imports
// const LocalStrategy = require("passport-local").Strategy;
// const passport = require("passport");
// const bcrypt = require("bcryptjs");

const app = express();

// Express imports
// const express = require("express");
// const bodyParser = require("body-parser");

// Database
// const mongoose = require("mongoose");
// const Users = require("./models/account-schema");

// Routing
// const createError = require("http-errors");
const indexRouter = require("./routes/index-router");
const accountRouter = require("./routes/accounts-router");
const postsRouter = require("./routes/posts-router");

// view engine setup
app.set("views", "./views");
app.set("view engine", "ejs");

// Application config
app.use(session({ secret: "cats", resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));

// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));

// Routing config
app.use("/", indexRouter);
app.use("/account", accountRouter);
app.use("/posts", postsRouter);

// Database connection
mongoose
  .connect(dburi)
  .then((result) => {
    // we are only listening for requests until after the conneciton to the db is established.
    console.log("ready");
    app.listen(port);
  })
  .catch((err) => {
    console.log(err);
  });

passport.use(
  new LocalStrategy((username, password, done) => {
    Users.findOne({ username: username }, (err, user) => {
      if (err) {
        return done(err);
      }
      if (!user) {
        console.log("Invalid credeials.");
        return done(null, false, { message: "Invalid Credentials" });
      }
      bcrypt.compare(password, user.password, (err, res) => {
        if (res) {
          console.log("Successful login. Returning user account.");
          return done(null, user, { message: "Login Successful" });
        } else {
          console.log("Incorrect password.");
          return done(null, false, { message: "Incorrect password" });
        }
      });
    });
  })
);

passport.serializeUser((user, done) => done(null, user.id));

passport.deserializeUser((id, done) =>
  Users.findById(id, (err, user) => done(err, user))
);

// default 404 page
app.use((req, res) => {
  res.render("404", { title: "ERROR", user: req.user });
});

module.exports = app;
