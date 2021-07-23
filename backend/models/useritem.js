var mongoose = require('mongoose');

var UserItemModel = new mongoose.Schema({
	tokenId: {
		type: String,
		required: true,
	},
	tokenType: {
		type: Number,
		required: true,
	},
	price: {
		type: String,
		required: false,
	},
	pId: {
		type: String,
		required: false,
	},
	comboId: {
		type: Number,
		required: false,
	},
	event: {
		type: String,
		required: true,
	},
	owner: {
		type: String,
		required: true,
	},
	buyDate: {
		type: Date,
		required: true,
		default: new Date(),
	},
});
const UserItem = mongoose.model('UserItem', UserItemModel, 'UserItem');

module.exports = UserItem;
