require("dotenv").config();

// Express imports
const express = require("express");
//const session = require("express-session");
const app = express();

// Password encrytpion imports
//const passport = require("passport");
//const LocalStrategy = require("passport-local").Strategy;
//const bcrypt = require("bcryptjs");

// Database imports
const mongoose = require("mongoose");
const dburi = process.env.dbURI;
const port = process.env.PORT;

// Routing
const createError = require("http-errors");
const indexRouter = require("./routes/index");
const accountRouter = require("./routes/account");
//const usersRouter = require("./routes/users");
//const messagesRouter = require("./routes/messages");

// view engine setup
app.set("views", "./views");
app.set("view engine", "ejs");

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

// Application config
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// password encryption setup
// app.use(session({ secret: "cats", resave: false, saveUninitialized: true }));
// app.use(passport.initialize());
// app.use(passport.session());

// passport.use(
// 	new LocalStrategy((username, password, done) => {
// 		User.findOne({ username: username }, (err, user) => {
// 			if (err) {
// 				return done(err);
// 			}
// 			if (!user) {
// 				return done(null, false, { message: "Incorrect username" });
// 			}
// 			bcrypt.compare(password, user.password, (err, res) => {
// 				if (res) {
// 					return done(null, user);
// 				} else {
// 					// passwords do not match!
// 					return done(null, false, { message: "Incorrect password" });
// 				}
// 			});
// 		});
// 	})
// );

// passport.serializeUser(function (user, done) {
// 	done(null, user.id);
// });

// passport.deserializeUser(function (id, done) {
// 	User.findById(id, function (err, user) {
// 		done(err, user);
// 	});
// });

//app.use(passport.initialize());

app.use("/", indexRouter);
app.use("/account", accountRouter);

//app.use("/users", usersRouter);
//app.use("/messages", messagesRouter);

// default 404 page
app.use((req, res) => {
	res.render("error", { title: "ERROR" });
});

//app.listen(port);

module.exports = app;
