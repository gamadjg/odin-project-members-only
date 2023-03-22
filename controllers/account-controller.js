const Users = require("../models/account-schema");
const bcrypt = require("bcryptjs");
const adminToken = process.env.ADMIN_TOKEN;
const memberToken = process.env.MEMBER_TOKEN;
const session = require("express-session");

const createUser = (req, res) => {
	Users.findOne({ username: req.body.username })
		.then((user) => {
			if (!user) {
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
			res.redirect("/account/sign-up");
		})
		.catch((err) => {
			console.log(err);
		});
};

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
				Users.findByIdAndUpdate(req.user._id.toString(), {
					accountType: "admin",
				})
					.then(res.redirect("/"))
					.catch((err) => {
						console.log(err);
					});
			} else {
				res.render("index", {
					title: "Update Membership Form",
					page: "account-membership-update",
					user: req.user,
					alert: ["Incorrect password. Please try again."],
				});
			}
			break;
		case "member":
			if (req.body.accountUpdatePassword === memberToken) {
				Users.findByIdAndUpdate(req.user._id.toString(), {
					accountType: "member",
				})
					.then(res.redirect("/"))
					.catch((err) => {
						console.log(err);
					});
			} else {
				res.render("index", {
					title: "Update Membership Form",
					page: "account-membership-update",
					user: req.user,
					alert: ["Incorrect password. Please try again."],
				});
			}
			break;
	}
};

module.exports = {
	createUser,
	logout,
	updateAccountType,
};
