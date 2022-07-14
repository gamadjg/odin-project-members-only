const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cardsSchema = new Schema(
	{
		card_name: {
			type: String,
			required: true,
		},
		card_description: {
			type: String,
			required: true,
		},
		card_set: {
			type: String,
			required: false,
		},
		card_type: {
			type: String,
			required: true,
		},
		card_img_name: {
			type: String,
			required: false,
		},
	},
	{ timestampes: true }
);

const cardsModel = mongoose.model("cards", cardsSchema);

module.exports = cardsModel;
