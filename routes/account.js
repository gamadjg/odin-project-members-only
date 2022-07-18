const express = require("express");
const router = express.Router();
const userController = require("../controllers/account-controller");

router.get("/", function (req, res) {
	res.render("index", { title: "User Account", page: "account-user" });
});

router.get("/login", function (req, res) {
	res.render("index", { title: "Account Login", page: "account-login" });
});

router.get("/sign-up", function (req, res) {
	res.render("index", { title: "Account Sign Up", page: "account-sign-up" });
});

router.post("/sign-up", function (req, res) {
	try {
		userController.createUser(req, res);
	} catch (error) {
		console.log(error);
	}
});

router.post("/login", (req, res) => {
	try {
		userController.login(req, res);
	} catch (error) {
		console.log(error);
	}
});

router.get("logout", (req, res) => {
	try {
		userController.login(res, res);
	} catch (error) {
		console.log(error);
	}
});
module.exports = router;
