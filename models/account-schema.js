const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
	{
		userDisplayName: {
			type: String,
			required: true,
		},
		username: {
			type: String,
			required: true,
		},
		password: {
			type: String,
			required: true,
		},
		accountType: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true }
);

const userModel = mongoose.model("users", userSchema);

module.exports = userModel;
