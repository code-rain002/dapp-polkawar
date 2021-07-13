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
// POST items based on category
router.post('/bid', async (req, res, next) => {
	let bidItems = [
		{
			itemId: '60ea7f0b1954d362ad256312',
			name: 'Sword',
			image: 'QmZ8K4DxcKJjYUsSqQDBXzXBeaWcpt96Yuy9Cg3nu2hXx5',
			description: 'Base Damage: 30, Bonus: +7%, Accuracy: +5',
			bidhistory: [],
			current_price: '2.0',
			start_price: '0.5',
			time_start: 'July 13, 2021 00:00:00 UTC',
			time_end: 'July 15, 2021 14:00:00 UTC',
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
