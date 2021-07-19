var mongoose = require('mongoose');

var BidModel = new mongoose.Schema({
	itemId: {
		type: String,
		required: true,
	},
	name: {
		type: String,
		required: true,
	},
	image: {
		type: String,
	},

	description: {
		type: String,
	},
	bidhistory: {
		type: Array,
		default: [],
	},
	last_update: {
		type: Date,
		required: true,
	},
	current_price: {
		type: String,
		required: true,
	},
	start_price: {
		type: String,
		required: true,
	},

	time_start: {
		type: Date,
		required: true,
	},
	time_end: {
		type: Date,
		required: true,
	},
});
const Bid = mongoose.model('Bid', BidModel, 'Bid');

module.exports = Bid;
