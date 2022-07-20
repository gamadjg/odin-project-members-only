const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cardsSchema = new Schema(
	{
		postTitle: {
			type: String,
			required: true,
		},
		postBody: {
			type: String,
			required: true,
		},
		userID: {
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

const cardsModel = mongoose.model("cards", cardsSchema);

module.exports = cardsModel;
