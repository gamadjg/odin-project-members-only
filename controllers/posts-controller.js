const Posts = require("../models/posts-schema");

const postsIndex = (req, res) => {
	Posts.find().then((result) => {
		//console.log(result);
		res.render("index", {
			title: "All Posts",
			page: "posts",
			user: req.user,
			postsList: result,
		});
	});
};

const getUserPosts = (req, res) => {
	//console.log(req.user._id.toString());
	userId = req.user._id.toString();
	Posts.find({ userId: { $eq: userId } }).then((result) => {
		res.render("index", {
			title: "User Posts",
			page: "posts",
			user: req.user,
			postsList: result,
		});
	});
};

const createPost = (req, res) => {
	console.log("Creating post");
	//console.log(req.user);
	const post = new Posts({
		postTitle: req.body.postTitle,
		postBody: req.body.postBody,
		userId: req.user._id.toString(),
		userDisplayName: req.user.userDisplayName,
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
	const delSource = req.params.page;
	console.log(delSource);

	Posts.findByIdAndDelete(postId)
		.then(() => {
			switch (delSource) {
				case "All Posts Page":
					res.json({ redirect: "/" });
					// res.render("posts", { title: "Posts", postsList: [] });
					// Posts.find().then((result) => {
					// 	res.render("posts", { title: "Posts", postsList: result });
					// });
					break;
				case "User Posts Page":
					res.json({ redirect: "/posts/user-posts" });
					//res.render("posts", { title: "Posts", postsList: [] });
					// Posts.find({ card_type: { $eq: "regular" } }).then((result) => {
					// 	res.render("my-posts", { title: "My Posts", postsList: result });
					// });
					break;
				default:
					res.json({ redirect: "/" });
					//res.render("posts", { title: "Posts", postsList: [] });
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
