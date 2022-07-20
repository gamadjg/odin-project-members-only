const Posts = require("../models/posts-schema");

const postsIndex = (req, res) => {
	Posts.find().then((result) => {
		console.log(result);
		res.render("index", {
			title: "All Posts",
			page: "posts",
			user: req.user,
			postsList: result,
		});
	});
};

const getUserPosts = (req, res) => {};

const createPost = (req, res) => {
	const post = new Post({
		post_title: req.body.postTitle,
		post_body: req.body.postBody,
		post_user: req.body.postUser,
	});
	post
		.save()
		.then((result) => {
			res.redirect("/");
		})
		.catch((err) => {
			console.log(err);
		});
};

const deletePost = (req, res) => {
	const postId = req.params.id;
	const delSource = req.params.source;

	Posts.findByIdAndDelete(postId)
		.then(() => {
			switch (delSource) {
				case "all":
					Posts.find().then((result) => {
						res.render("posts", { title: "Posts", postsList: result });
					});
					break;
				case "user":
					Posts.find({ card_type: { $eq: "regular" } }).then((result) => {
						res.render("my-posts", { title: "My Posts", postsList: result });
					});
					break;
				default:
					res.render("posts", { title: "Posts", postsList: [] });
					break;
			}
		})
		.catch((error) => {
			console.log(error);
		});
};

module.exports = {
	postsIndex,
	getUserPosts,
	createPost,
	deletePost,
};
