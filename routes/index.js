var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res) {
	const result = [];

	res.render("index", {
		title: "All Posts",
		page: "posts",
		user: req.user,
		posts: result,
	});
});

module.exports = router;
