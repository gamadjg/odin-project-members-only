const Users = require("../models/account-schema");
const bcrypt = require("bcryptjs");

const createUser = (req, res) => {
	//console.log(`User email: ${req.body.email}`);
	Users.findOne({ email: req.body.email }, (err, usr) => {
		if (err) {
			console.log(err);
		}
		if (!usr) {
			console.log("Creating user.");
			bcrypt.hash(req.body.password, 10, (err, hashedPwd) => {
				const user = new Users({
					name: req.body.name,
					email: req.body.email,
					password: hashedPwd,
				});
				user
					.save()
					.then((result) => {
						res.redirect("/account/sign-up");
					})
					.catch((err) => {
						console.log(err);
					});
			});
		}
		if (usr) {
			console.log("user already exists");
			res.redirect("/account/sign-up");
		}
	});
};

const login = (req, res) => {
	passport.authenticate("local", {
		successRedirect: "/",
		failureRedirect: "/",
	});
};

const logout = (req, res) => {
	req.logout((err) => {
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
