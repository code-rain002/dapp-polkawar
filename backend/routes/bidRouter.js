var express = require('express');
var router = express.Router();
var BidDao = require('../dao/bid');

// Public
// GET Single item based on ID
router.get('/bid/:id', async (req, res, next) => {
	const itemid = req.params.id;
	try {
		const data = await BidDao.getBidItemById(itemid);
		return res.status(200).send(data);
	} catch (error) {
		return res.status(400).send('error');
	}
});

// Public
// GET ALL BID ITEMS
router.get('/bids', async (req, res, next) => {
	try {
		const data = await BidDao.getAllBidItems();
		return res.status(200).send(data);
	} catch (error) {
		return res.status(400).send('error');
	}
});

// Public
// POST UPDATE BID HISTORY BY ID
router.post('/bid/:id', async (req, res, next) => {
	const itemId = req.params.id;
	const bidData = req.body;

	let bidHistory = {
		address: bidData.address,
		time: new Date(),
		price: bidData.amount,
		isactive: 1,
	};
	console.log(bidHistory);
	try {
		const data = await BidDao.updateBidItem(itemId, bidHistory);
		if (!data) {
			return res.status(400).send('error');
		} else {
			return res.status(200).send(data);
		}
	} catch (error) {
		return res.status(400).send('error');
	}
});

// Public
// POST A new item for biding
router.post('/bid', async (req, res, next) => {
	let bidItems = [
		// {
		// 	itemId: '0',
		// 	name: 'PolkaWar Mystery Box',
		// 	image: 'QmZ8K4DxcKJjYUsSqQDBXzXBeaWcpt96Yuy9Cg3nu2hXx5',
		// 	description: 'This mystery Box will contains NFT item, BNB rewards and PWAR tokens.',
		// 	bidhistory: [],
		// 	last_update: new Date(),
		// 	current_price: '0.5',
		// 	start_price: '0.5',
		// 	time_start: 'July 23, 2021 14:00:00 UTC',
		// 	time_end: 'July 24, 2021 14:00:00 UTC',
		// },
		{
			itemId: '1',
			name: 'PolkaWar Mystery Box 2',
			image: 'QmYwkWx62Pr9bfiRZuyc1tKD2UmS1hYJAapeo3iwXPmuUn',
			description: 'This Mystery Box will contains NFT item, BNB rewards and PWAR tokens.',
			bidhistory: [],
			last_update: new Date(),
			current_price: '0.5',
			start_price: '0.5',
			time_start: 'July 29, 2021 14:00:00 UTC',
			time_end: 'July 30, 2021 14:00:00 UTC',
		},
	];

	try {
		const data = await BidDao.createBidItem([ ...bidItems ]);
		return res.status(200).send(data);
	} catch (error) {
		return res.status(400).send('error');
	}
});

// DELETE items based on category
router.delete('/bid', async (req, res, next) => {
	try {
		const data = await BidDao.deleteItem();
		return res.status(200).send(data);
	} catch (error) {
		return res.status(400).send('error');
	}
});
module.exports = router;
