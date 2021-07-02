var express = require('express');
var router = express.Router();

var UserItemDao = require('../dao/useritem');

// Public
// GET Single item based on ID
router.get('/useritem/:id', async (req, res, next) => {
  const itemid = req.params.id;
  try {
    const data = await UserItemDao.getItemById(itemid);
    return res.status(200).send(data);
  } catch (error) {
    return res.status(400).send('error');
  }
});

// Public
// GET All User Items based on owner address
router.get('/useritem/:owner', async (req, res, next) => {
  // let ownerAddress = req.params.owner;
  // console.log('hello' + ownerAddress);

  try {
    const data = await UserItemDao.getItems('0x9D7117a07fca9F22911d379A9fd5118A5FA4F448');
    return res.status(200).send(data);
  } catch (error) {
    console.log(error);
    return res.status(400).send('error');
  }
});

// Public
// POST items based on category
router.post('/useritem', async (req, res, next) => {
  var soldItem = {
    tokenId: req.body.token_id,
    tokenType: req.body.token_type,
    event: req.body.event,
    owner: req.body.owner,
    buyDate: req.body.buy_date,
  };
  console.log(soldItem);
  try {
    const data = await UserItemDao.createItem(soldItem);
    return res.status(200).send(data);
  } catch (error) {
    return res.status(400).send('error');
  }
});

// DELETE items based on category
router.delete('/useritem', async (req, res, next) => {
  try {
    const data = await UserItemDao.deleteItem();
    return res.status(200).send(data);
  } catch (error) {
    return res.status(400).send('error');
  }
});
module.exports = router;
