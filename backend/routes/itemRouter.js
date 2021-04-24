var express = require('express');
var router = express.Router();
var axios = require('axios');
var multer = require('multer');
var FormData = require('form-data');
var fs = require('fs');

var ItemDao = require('../dao/item');

// Public
// GET Single item based on ID
router.get('/item/:id', async (req, res, next) => {
  const itemid = req.params.id;
  try {
    const data = await ItemDao.getItemById(itemid);
    return res.status(200).send(data);
  } catch (error) {
    return res.status(400).send('error');
  }
});

// Public
// GET All Items based on category
router.get('/items/:category', async (req, res, next) => {
  try {
    const category = '';
    if (req.params.category === 'All') {
      category = '';
    } else {
      category = req.params.category;
    }
    const data = await ItemDao.getItems(category);
    return res.status(200).send(data);
  } catch (error) {
    return res.status(400).send('error');
  }
});
module.exports = router;
