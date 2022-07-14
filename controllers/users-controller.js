const Cards = require("../models/cards-schema");

const cards_index = (req, res) => {
	const cardType = req.params.id;
	switch (cardType) {
		case "all":
			Cards.find().then((result) => {
				res.render("cards", { title: "Cards", cardsList: result });
			});
			break;
		case "regular":
			Cards.find({ card_type: { $eq: "regular" } }).then((result) => {
				res.render("cards", { title: "Cards", cardsList: result });
			});
			break;
		case "characters":
			Cards.find({ card_type: { $eq: "character" } }).then((result) => {
				res.render("cards", { title: "Characters", cardsList: result });
			});
			break;
		case "equipables":
			Cards.find({ card_type: { $eq: "equipment" } }).then((result) => {
				res.render("cards", { title: "Equipment", cardsList: result });
			});
			break;
		case "roles":
			Cards.find({ card_type: { $eq: "role" } }).then((result) => {
				res.render("cards", { title: "Player Roles", cardsList: result });
			});
			break;
		default:
			res.render("cards", { title: "Cards", cardsList: [] });
			break;
	}
};

const create_card = (req, res) => {
	const card = new Cards({
		card_name: req.body.card_name,
		card_description: req.body.card_description,
		card_set: "new card",
		card_type: req.body.card_type,
		card_img_name: "new-card",
	});
	card
		.save()
		.then((result) => {
			switch (req.body.card_type) {
				case "character":
					res.redirect("cards/characters");
					break;
				case "regular":
					res.redirect("cards/regular");
					break;
				case "equipment":
					res.redirect("cards/equipables");
					break;
				case "role":
					res.redirect("cards/roles");
					break;
				default:
					res.redirect("cards/all");
					break;
			}
		})
		.catch((err) => {
			console.log(err);
		});
};

const delete_card = (req, res) => {
	const id = req.params.id;
	// mongoose method called to delete task in db, task specified by its id

	Cards.findById(id).then((result) => {
		const cardRedirectLoc = result.card_type;
		Cards.findByIdAndDelete(id)
			.then(() => {
				switch (cardRedirectLoc) {
					case "regular":
						res.json({ redirect: "/cards/regular" });
						break;
					case "role":
						res.json({ redirect: "/cards/roles" });
						break;
					case "equipment":
						res.json({ redirect: "/cards/equipables" });
						break;
					case "character":
						res.json({ redirect: "/cards/characters" });
						break;
					default:
						res.json({ redirect: "/cards/all" });
						break;
				}
			})
			.catch((error) => {
				console.log(error);
			});
	});
};

module.exports = {
	cards_index,
	create_card,
	delete_card,
};
