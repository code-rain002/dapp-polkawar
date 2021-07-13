var BidModel = require('../models/bid');

const bidDao = {
	async getBidItemById(id) {
		return await BidModel.findOne({ itemId: id });
	},

	async getItems() {
		return await BidModel.find({});
	},

	async createBidItem(itemData) {
		console.log('DAO');
		await BidModel.insertMany(itemData);
		return await BidModel.find({});
	},

	async deleteItem() {
		await BidModel.deleteMany({});
		return await BidModel.find({});
	},
};

module.exports = bidDao;
