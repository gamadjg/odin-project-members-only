const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postsSchema = new Schema(
	{
		postTitle: {
			type: String,
			required: true,
		},
		postBody: {
			type: String,
			required: true,
		},
		userId: {
			type: String,
			required: true,
		},
		userDisplayName: {
			type: String,
			required: true,
		},
	},
	{ timestampes: true }
);

const postsModel = mongoose.model("posts", postsSchema);

module.exports = postsModel;
