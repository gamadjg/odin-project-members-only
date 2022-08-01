const express = require("express");
const router = express.Router();
//const session = require("express-session");

const accountController = require("../controllers/account-controller");
const postsController = require("../controllers/posts-controller");

router.get("/", (req, res) => {
	res.render("index", {
		title: "User Account",
		page: "account-user",
		user: req.user,
		errorMessage: "test",
	});
});

router.get("/log-in", function (req, res) {
	res.render("index", {
		title: "Account Login",
		page: "account-log-in",
		user: req.user,
		errorMessage: "test",
	});
});

router.post("/log-in", (req, res) => {
	try {
		//console.log("Calling login module");
		accountController.login(req, res);
	} catch (error) {
		console.log(error);
	}
});

router.get("/sign-up", (req, res) => {
	res.render("index", {
		title: "Account Sign Up",
		page: "account-sign-up",
		user: req.user,
		errorMessage: "test",
	});
});

router.post("/sign-up", (req, res) => {
	try {
		accountController.createUser(req, res);
	} catch (error) {
		console.log(error);
	}
});

router.get("/update-account-type", (req, res) => {
	// console.log(`error: ${req.session.error}`);
	// console.log(typeof req.session.error);
	const er = req.session.error;
	//console.log(er);
	res.render("index", {
		title: "Update Membership Form",
		page: "account-membership-update",
		user: req.user,
		errorMessage: er,
	});
	//delete res.session.error;
});

router.post("/update-account-type", (req, res) => {
	try {
		accountController.updateAccountType(req, res);
	} catch (error) {
		console.log(error);
	}
});

router.get("/log-out", (req, res) => {
	try {
		accountController.logout(req, res);
	} catch (error) {
		console.log(error);
	}
});

module.exports = router;
