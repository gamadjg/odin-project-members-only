const express = require("express");
const router = express.Router();
const postsController = require("../controllers/posts-controller");

router.get("/user-posts", function (req, res) {
	try {
		postsController.getUserPosts(req, res);
	} catch (error) {
		console.log(error);
	}
});

router.post("/create", (req, res) => {
	try {
		console.log("Creating post");
		//postsController.login(req, res);
	} catch (error) {
		console.log(error);
	}
});

module.exports = router;
