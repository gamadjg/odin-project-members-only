const Users = require("../models/account-schema");
const bcrypt = require("bcryptjs");
const passport = require("passport");
const adminToken = process.env.ADMIN_TOKEN;
const memberToken = process.env.MEMBER_TOKEN;
const session = require("express-session");

const createUser = (req, res) => {
	//console.log(`User email: ${req.body.email}`);
	Users.findOne({ username: req.body.username }, (err, user) => {
		if (err) {
			console.log(err);
		}
		if (!user) {
			console.log("Creating user.");
			bcrypt.hash(req.body.password, 10, (err, hashedPwd) => {
				const newUser = new Users({
					userDisplayName: req.body.displayName,
					username: req.body.username,
					password: hashedPwd,
					accountType: "user",
				});
				newUser
					.save()
					.then(() => {
						res.redirect("/");
					})
					.catch((err) => {
						console.log(err);
					});
			});
		}
		if (user) {
			console.log("user already exists");
			res.redirect("/account/sign-up");
		}
	});
};

const login = passport.authenticate("local", {
	successRedirect: "/",
	failureRedirect: "/account/log-in",
});

const logout = (req, res) => {
	req.logout(function (err) {
		if (err) {
			return next(err);
		}
		res.redirect("/");
	});
};

const updateAccountType = (req, res) => {
	switch (req.body.accountUpdateType) {
		case "admin":
			if (req.body.accountUpdatePassword === adminToken) {
				Users.findByIdAndUpdate(
					req.user._id,
					{ accountType: "admin" },
					(err) => {
						if (err) {
							console.log(err);
						} else {
							res.redirect("/");
						}
					}
				);
			} else {
				res.render("index", {
					title: "Incorrect Password",
					page: "error",
					user: req.user,
					message:
						"Incorrect password, please return to membership update page and try again.",
				});
			}
			break;
		case "member":
			if (req.body.accountUpdatePassword === memberToken) {
				Users.findByIdAndUpdate(
					req.user._id.toString(),
					{ accountType: "member" },
					(err) => {
						if (err) {
							console.log(err);
						} else {
							res.redirect("/");
						}
					}
				);
			} else {
				res.render("index", {
					title: "Incorrect Password",
					page: "error",
					user: req.user,
					message:
						"Incorrect password, please return to membership update page and try again.",
				});
			}
			break;
	}
};

module.exports = {
	createUser,
	login,
	logout,
	updateAccountType,
};
