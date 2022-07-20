const express = require("express");
const router = express.Router();
const accountController = require("../controllers/account-controller");
const postsController = require("../controllers/posts-controller");

router.get("/create", function (req, res) {
	res.render("index", {
		title: "Create a Post",
		page: "post-create",
		user: req.user,
	});
});

router.post("/create", (req, res) => {
	try {
		console.log("Calling login module");
		accountController.login(req, res);
	} catch (error) {
		console.log(error);
	}
});

module.exports = router;
