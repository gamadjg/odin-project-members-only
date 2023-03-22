// Env
require("dotenv").config();
require("./middleware/authenticator");
const express = require("express");
const session = require("express-session");
const passport = require("passport");
// const LocalStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");
// const Users = require("./models/account-schema");
// const bcrypt = require("bcryptjs");
const dburi = process.env.DBURI;
const port = process.env.PORT;
const app = express();

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
		console.log(`listening on port ${port}`);
		app.listen(port);
	})
	.catch((err) => {
		console.log(err);
	});

// default 404 page
app.use((req, res) => {
	res.render("404", { title: "ERROR", user: req.user });
});

module.exports = app;

// Test message after having updated all mongoose functions, removing callbacks in place of promises.
