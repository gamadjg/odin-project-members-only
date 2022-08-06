const Posts = require("../models/posts-schema");

const postsIndex = (req, res) => {
  Posts.find().then((result) => {
    res.render("index", {
      title: "All Posts",
      page: "posts",
      user: req.user,
      posts: result,
    });
  });
};

const getUserPosts = (req, res) => {
  userId = req.user._id.toString();
  Posts.find({ userId: { $eq: userId } }).then((result) => {
    res.render("index", {
      title: "User Posts",
      page: "posts",
      user: req.user,
      posts: result,
    });
  });
};

const createPost = (req, res) => {
  console.log("Creating post");
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
          break;
        case "User Posts Page":
          res.json({ redirect: "/posts/posts-user" });
          break;
        default:
          res.json({ redirect: "/" });
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
