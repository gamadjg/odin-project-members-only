const Posts = require("../models/posts-schema");

const postsIndex = (req, res) => {
	// messageType will be either the user id or 'all'
	const postsLocation = req.params.postType;
	const userId = req.params.userId;
	switch (postsLocation) {
		case "all":
			Posts.find().then((result) => {
				res.render("posts", { title: "Posts", postsList: result });
			});
			break;
		case "user":
			Posts.findOne({ _id: { $eq: "userId" } }).then((result) => {
				res.render("my-posts", { title: "My Posts", postsList: result });
			});
			break;
		default:
			res.render("posts", { title: "Posts", postsList: [] });
			break;
	}
};

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
	createPost,
	deletePost,
};
