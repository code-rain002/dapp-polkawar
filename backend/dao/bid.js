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
	async updateBidItem(itemId, bidData) {
		console.log('updateBidItem');
		let bidItem = await BidModel.findOne({ itemId: itemId });
		let bidHistory = bidItem.bidhistory;
		if (bidHistory.length > 0) {
			bidHistory[bidHistory.length - 1].isactive = 0;
		}
		await BidModel.findOneAndUpdate({ itemId: itemId }, { bidhistory: [ ...bidHistory, bidData ] });

		return await BidModel.findOne({ itemId: itemId });
	},

	async deleteItem() {
		await BidModel.deleteMany({});
		return await BidModel.find({});
	},
};

module.exports = bidDao;
