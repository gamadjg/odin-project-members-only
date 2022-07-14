const express = require("express");
var router = express.Router();

router.get("/", function (req, res) {
	res.render("index", { title: "User Account", page: "account-user" });
});

router.get("/login", function (req, res) {
	res.render("index", { title: "Account Login", page: "account-login" });
});

router.get("/sign-up", function (req, res) {
	res.render("index", { title: "Account Sign Up", page: "account-sign-up" });
});

module.exports = router;
