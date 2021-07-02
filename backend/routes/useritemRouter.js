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
// GET All Items based on category
router.get('/useritem', async (req, res, next) => {
  try {
    const data = await UserItemDao.getItems();
    return res.status(200).send(data);
  } catch (error) {
    return res.status(400).send('error');
  }
});

// Public
// GET All Items pagination
router.get('/useritem/:pageIndex/:pageSize', async (req, res, next) => {
  const pageIndex = parseInt(req.params.pageIndex);
  const pageSize = parseInt(req.params.pageSize);
  try {
    const data = await UserItemDao.getListItems(pageIndex, pageSize);
    return res.status(200).send(data);
  } catch (error) {
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
    buyDate: req.body.buy_time,
  };

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
