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
		postsController.createPost(req, res);
	} catch (error) {
		console.log(error);
	}
});

router.delete("/delete/:page/:id", (req, res) => {
	try {
		postsController.deletePost(req, res);
	} catch (error) {
		console.log(error);
	}
});

module.exports = router;
