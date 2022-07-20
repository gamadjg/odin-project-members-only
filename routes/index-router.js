var express = require("express");
var router = express.Router();
const postsController = require("../controllers/posts-controller");

// Get all user posts
router.get("/", function (req, res) {
	try {
		postsController.postsIndex(req, res);
	} catch (error) {
		console.log(error);
	}
});

module.exports = router;
