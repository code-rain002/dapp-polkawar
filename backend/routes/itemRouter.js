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
    const data = await ItemDao.getItems(req.params.category);
    return res.status(200).send(data);
  } catch (error) {
    return res.status(400).send('error');
  }
});

// Public
// GET All Items pagination
router.get('/items/:pageIndex/:pageSize', async (req, res, next) => {
  const pageIndex = parseInt(req.params.pageIndex);
  const pageSize = parseInt(req.params.pageSize);
  try {
    const data = await ItemDao.getListItems(pageIndex, pageSize);
    return res.status(200).send(data);
  } catch (error) {
    return res.status(400).send('error');
  }
});

// Public
// POST items based on category
router.post('/item', async (req, res, next) => {
  var swordData = [
    {
      name: 'Normal Sword',
      price: '0.3',
      currency: 'ETH',
      description: 'No description',
      level: 1,
      image: 'sword1.png',
      category: 'sword',
    },
    {
      name: 'Icy Sword',
      price: '0.4',
      currency: 'ETH',
      description: 'No description',
      level: 2,
      image: 'sword1.png',
      category: 'sword',
    },
    {
      name: 'Lightening Sword',
      price: '0.5',
      currency: 'ETH',
      description: 'No description',
      level: 3,
      image: 'sword1.png',
      category: 'sword',
    },
    {
      name: 'Sharp Sword',
      price: '0.7',
      currency: 'ETH',
      description: 'No description',
      level: 4,
      image: 'sword1.png',
      category: 'sword',
    },
    {
      name: 'Fire Sword',
      price: '1.0',
      currency: 'ETH',
      description: 'No description',
      level: 5,
      image: 'sword1.png',
      category: 'sword',
    },
  ];

  var gunData = [
    {
      name: 'Normal Gun',
      price: '1.3',
      currency: 'ETH',
      description: 'No description',
      level: 1,
      image: 'gun1.png',
      category: 'gun',
    },
    {
      name: 'Speed Gun',
      price: '1.6',
      currency: 'ETH',
      description: 'No description',
      level: 2,
      image: 'gun1.png',
      category: 'gun',
    },
    {
      name: 'Light Gun',
      price: '1.8',
      currency: 'ETH',
      description: 'No description',
      level: 3,
      image: 'gun1.png',
      category: 'gun',
    },
    {
      name: 'Fast Gun',
      price: '2.0',
      currency: 'ETH',
      description: 'No description',
      level: 4,
      image: 'gun1.png',
      category: 'gun',
    },
    {
      name: 'Fire Gun',
      price: '2.9',
      currency: 'ETH',
      description: 'No description',
      level: 5,
      image: 'gun1.png',
      category: 'gun',
    },
  ];
  try {
    const data = await ItemDao.createItem(gunData);
    return res.status(200).send(data);
  } catch (error) {
    return res.status(400).send('error');
  }
});

module.exports = router;
