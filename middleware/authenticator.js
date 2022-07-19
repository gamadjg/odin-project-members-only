const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const passport = require("passport");

passport.use(
	new LocalStrategy((username, password, done) => {
		console.log(username);
		console.log(password);

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

passport.serializeUser(function (user, done) {
	done(null, user.id);
});

passport.deserializeUser(function (id, done) {
	User.findById(id, function (err, user) {
		done(err, user);
	});
});

// module.exports{
//     passport.use,
//     passport.serializeUser,
//     passport.de
// }
