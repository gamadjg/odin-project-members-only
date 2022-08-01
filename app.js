// Env
require("dotenv").config();
const dburi = process.env.DBURI;
const port = process.env.PORT;

// Express imports
const express = require("express");
const session = require("express-session");
const app = express();

// Password encrytpion imports
const LocalStrategy = require("passport-local").Strategy;
const passport = require("passport");
//const authenticator = require("./middleware/authenticator");
const bcrypt = require("bcryptjs");

// Database
const mongoose = require("mongoose");
const Users = require("./models/account-schema");

// Routing
const createError = require("http-errors");
const indexRouter = require("./routes/index-router");
const accountRouter = require("./routes/accounts-router");
const postsRouter = require("./routes/posts-router");

// view engine setup
app.set("views", "./views");
app.set("view engine", "ejs");

// Application config
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));

// password encryption setup
app.use(session({ secret: "cats", resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

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
		//console.log(username);
		//console.log(password);

		Users.findOne({ username: username }, (err, user) => {
			if (err) {
				console.log(err);
				return done(err);
			}
			if (!user) {
				console.log(err);
				return done(null, false, { message: "Incorrect username" });
			}
			bcrypt.compare(password, user.password, (err, res) => {
				if (res) {
					console.log("Successful login. Returning user account.");
					return done(null, user);
				} else {
					// passwords do not match!
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
