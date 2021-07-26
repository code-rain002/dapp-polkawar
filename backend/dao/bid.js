var BidModel = require('../models/bid');

const bidDao = {
	async getBidItemById(id) {
		return await BidModel.findOne({ itemId: id });
	},

	async getAllBidItems() {
		return await BidModel.find({});
	},

	async createBidItem(itemData) {
		console.log('DAO');
		await BidModel.insertMany(itemData);
		return await BidModel.find({});
	},

	async updateBidItem(itemId, bidData) {
		console.log('updateBidItem');
		console.log(bidData);
		let bidItem = await BidModel.findOne({ itemId: itemId });
		let bidHistory = bidItem.bidhistory;

		if (bidHistory.length > 0) {
			bidHistory[bidHistory.length - 1].isactive = 0;
		}
		let prevHighestBiddingPrice = bidItem.current_price;
		console.log(prevHighestBiddingPrice);
		console.log(bidData['price']);
		if (parseFloat(bidData['price']) > parseFloat(prevHighestBiddingPrice)) {
			console.log('true');
			await BidModel.findOneAndUpdate(
				{ itemId: itemId },
				{
					bidhistory: [ ...bidHistory, bidData ],
					current_price: bidData['price'],
					last_update: bidData['time'],
				},
			);

			return await BidModel.findOne({ itemId: itemId });
		} else {
			return false;
		}
	},

	async deleteItem() {
		await BidModel.remove({ itemId: '1' });
		return await BidModel.find({});
	},
};

module.exports = bidDao;
