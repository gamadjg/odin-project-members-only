const Users = require("../models/account-schema");
const bcrypt = require("bcryptjs");
const passport = require("passport");

const createUser = (req, res) => {
	//console.log(`User email: ${req.body.email}`);
	Users.findOne({ email: req.body.email }, (err, user) => {
		if (err) {
			console.log(err);
		}
		if (!user) {
			console.log("Creating user.");
			bcrypt.hash(req.body.password, 10, (err, hashedPwd) => {
				const newUser = new Users({
					name: req.body.name,
					username: req.body.email,
					password: hashedPwd,
					accountType: "user",
				});
				newUser
					.save()
					.then((result) => {
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

module.exports = {
	createUser,
	login,
	logout,
};
