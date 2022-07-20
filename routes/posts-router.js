const express = require("express");
const router = express.Router();
const postsController = require("../controllers/posts-controller");

router.get("/user-posts", function (req, res) {
	let result = [
		{
			title: "a post",
			body: "post body",
		},
	];

	try {
		result = postsController.postsIndex();
	} catch (error) {
		console.log(error);
	}

	res.render("index", {
		title: "User Posts",
		page: "posts-user",
		user: req.user,
		posts: result,
	});
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
