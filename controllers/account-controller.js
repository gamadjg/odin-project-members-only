const Users = require("../models/account-schema");

const createUser = (req, res) => {
	console.log(`User email: ${req.body.email}`);
	Users.findOne({ email: req.body.email }, (err, usr) => {
		if (err) {
			console.log(err);
		}
		if (!usr) {
			console.log("Creating user.");
			const user = new Users({
				name: req.body.name,
				email: req.body.email,
				password: req.body.password,
			});
			user
				.save()
				.then((result) => {
					res.redirect("/account/sign-up");
				})
				.catch((err) => {
					console.log(err);
				});
		}
		if (usr) {
			console.log("user already exists");
			res.redirect("/account/sign-up");
		}
	});
};

module.exports = {
	createUser,
};
