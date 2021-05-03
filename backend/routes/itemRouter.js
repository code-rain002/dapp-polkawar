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
  var armorData = [
    {
      name: 'Armor',
      price: '0.1',
      currency: 'ETH',
      description: 'No description',
      level: 1,
      image: 'https://gateway.pinata.cloud/ipfs/QmX6U3cGjwzgYpwvzLvy5brfiR3it28pEnHrdWGqRD77gn/armor.png',
      category: 'armor',
    },
    {
      name: 'Armor',
      price: '1.6',
      currency: 'ETH',
      description: 'No description',
      level: 2,
      image: 'https://gateway.pinata.cloud/ipfs/QmX6U3cGjwzgYpwvzLvy5brfiR3it28pEnHrdWGqRD77gn/armor.png',
      category: 'armor',
    },
    {
      name: 'Armor',
      price: '1.8',
      currency: 'ETH',
      description: 'No description',
      level: 3,
      image: 'https://gateway.pinata.cloud/ipfs/QmX6U3cGjwzgYpwvzLvy5brfiR3it28pEnHrdWGqRD77gn/armor.png',
      category: 'armor',
    },
    {
      name: 'Armor',
      price: '2.0',
      currency: 'ETH',
      description: 'No description',
      level: 4,
      image: 'https://gateway.pinata.cloud/ipfs/QmX6U3cGjwzgYpwvzLvy5brfiR3it28pEnHrdWGqRD77gn/armor.png',
      category: 'armor',
    },
    {
      name: 'Armor',
      price: '2.9',
      currency: 'ETH',
      description: 'No description',
      level: 5,
      image: 'https://gateway.pinata.cloud/ipfs/QmX6U3cGjwzgYpwvzLvy5brfiR3it28pEnHrdWGqRD77gn/armor.png',
      category: 'armor',
    },
  ];
  var swordData = [
    {
      name: 'Normal Sword',
      price: '0.3',
      currency: 'ETH',
      description: 'No description',
      level: 1,
      image: 'https://gateway.pinata.cloud/ipfs/QmX6U3cGjwzgYpwvzLvy5brfiR3it28pEnHrdWGqRD77gn/sword.png',
      category: 'sword',
    },
    {
      name: 'Icy Sword',
      price: '0.4',
      currency: 'ETH',
      description: 'No description',
      level: 2,
      image: 'https://gateway.pinata.cloud/ipfs/QmX6U3cGjwzgYpwvzLvy5brfiR3it28pEnHrdWGqRD77gn/sword.png',
      category: 'sword',
    },
    {
      name: 'Lightening Sword',
      price: '0.5',
      currency: 'ETH',
      description: 'No description',
      level: 3,
      image: 'https://gateway.pinata.cloud/ipfs/QmX6U3cGjwzgYpwvzLvy5brfiR3it28pEnHrdWGqRD77gn/sword.png',
      category: 'sword',
    },
    {
      name: 'Sharp Sword',
      price: '0.7',
      currency: 'ETH',
      description: 'No description',
      level: 4,
      image: 'https://gateway.pinata.cloud/ipfs/QmX6U3cGjwzgYpwvzLvy5brfiR3it28pEnHrdWGqRD77gn/sword.png',
      category: 'sword',
    },
    {
      name: 'Fire Sword',
      price: '1.0',
      currency: 'ETH',
      description: 'No description',
      level: 5,
      image: 'https://gateway.pinata.cloud/ipfs/QmX6U3cGjwzgYpwvzLvy5brfiR3it28pEnHrdWGqRD77gn/sword.png',
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
      image: 'https://gateway.pinata.cloud/ipfs/QmX6U3cGjwzgYpwvzLvy5brfiR3it28pEnHrdWGqRD77gn/gun.png',
      category: 'gun',
    },
    {
      name: 'Speed Gun',
      price: '1.6',
      currency: 'ETH',
      description: 'No description',
      level: 2,
      image: 'https://gateway.pinata.cloud/ipfs/QmX6U3cGjwzgYpwvzLvy5brfiR3it28pEnHrdWGqRD77gn/gun.png',
      category: 'gun',
    },
    {
      name: 'Light Gun',
      price: '1.8',
      currency: 'ETH',
      description: 'No description',
      level: 3,
      image: 'https://gateway.pinata.cloud/ipfs/QmX6U3cGjwzgYpwvzLvy5brfiR3it28pEnHrdWGqRD77gn/gun.png',
      category: 'gun',
    },
    {
      name: 'Fast Gun',
      price: '2.0',
      currency: 'ETH',
      description: 'No description',
      level: 4,
      image: 'https://gateway.pinata.cloud/ipfs/QmX6U3cGjwzgYpwvzLvy5brfiR3it28pEnHrdWGqRD77gn/gun.png',
      category: 'gun',
    },
    {
      name: 'Fire Gun',
      price: '2.9',
      currency: 'ETH',
      description: 'No description',
      level: 5,
      image: 'https://gateway.pinata.cloud/ipfs/QmX6U3cGjwzgYpwvzLvy5brfiR3it28pEnHrdWGqRD77gn/gun.png',
      category: 'gun',
    },
  ];
  var bowData = [
    {
      name: 'Bow',
      price: '0.2',
      currency: 'ETH',
      description: 'No description',
      level: 1,
      image: 'https://gateway.pinata.cloud/ipfs/QmX6U3cGjwzgYpwvzLvy5brfiR3it28pEnHrdWGqRD77gn/bow.png',
      category: 'bow and arrow',
    },
    {
      name: 'Bow',
      price: '0.3',
      currency: 'ETH',
      description: 'No description',
      level: 2,
      image: 'https://gateway.pinata.cloud/ipfs/QmX6U3cGjwzgYpwvzLvy5brfiR3it28pEnHrdWGqRD77gn/bow.png',
      category: 'bow and arrow',
    },
    {
      name: 'Bow',
      price: '0.5',
      currency: 'ETH',
      description: 'No description',
      level: 3,
      image: 'https://gateway.pinata.cloud/ipfs/QmX6U3cGjwzgYpwvzLvy5brfiR3it28pEnHrdWGqRD77gn/bow.png',
      category: 'bow and arrow',
    },
    {
      name: 'Bow',
      price: '0.6',
      currency: 'ETH',
      description: 'No description',
      level: 4,
      image: 'https://gateway.pinata.cloud/ipfs/QmX6U3cGjwzgYpwvzLvy5brfiR3it28pEnHrdWGqRD77gn/bow.png',
      category: 'bow and arrow',
    },
    {
      name: 'Bow',
      price: '0.9',
      currency: 'ETH',
      description: 'No description',
      level: 5,
      image: 'https://gateway.pinata.cloud/ipfs/QmX6U3cGjwzgYpwvzLvy5brfiR3it28pEnHrdWGqRD77gn/bow.png',
      category: 'bow and arrow',
    },
  ];

  var helmetData = [
    {
      name: 'Helmet',
      price: '0.2',
      currency: 'ETH',
      description: 'No description',
      level: 1,
      image: 'https://gateway.pinata.cloud/ipfs/QmX6U3cGjwzgYpwvzLvy5brfiR3it28pEnHrdWGqRD77gn/helmet.png',
      category: 'helmet',
    },
    {
      name: 'Helmet',
      price: '0.3',
      currency: 'ETH',
      description: 'No description',
      level: 2,
      image: 'https://gateway.pinata.cloud/ipfs/QmX6U3cGjwzgYpwvzLvy5brfiR3it28pEnHrdWGqRD77gn/helmet.png',
      category: 'helmet',
    },
    {
      name: 'Helmet',
      price: '0.5',
      currency: 'ETH',
      description: 'No description',
      level: 3,
      image: 'https://gateway.pinata.cloud/ipfs/QmX6U3cGjwzgYpwvzLvy5brfiR3it28pEnHrdWGqRD77gn/helmet.png',
      category: 'helmet',
    },
    {
      name: 'Helmet',
      price: '0.6',
      currency: 'ETH',
      description: 'No description',
      level: 4,
      image: 'https://gateway.pinata.cloud/ipfs/QmX6U3cGjwzgYpwvzLvy5brfiR3it28pEnHrdWGqRD77gn/helmet.png',
      category: 'helmet',
    },
    {
      name: 'Helmet',
      price: '0.9',
      currency: 'ETH',
      description: 'No description',
      level: 5,
      image: 'https://gateway.pinata.cloud/ipfs/QmX6U3cGjwzgYpwvzLvy5brfiR3it28pEnHrdWGqRD77gn/helmet.png',
      category: 'helmet',
    },
  ];
  var wingData = [
    {
      name: 'Wing',
      price: '0.2',
      currency: 'ETH',
      description: 'No description',
      level: 1,
      image: 'https://gateway.pinata.cloud/ipfs/QmX6U3cGjwzgYpwvzLvy5brfiR3it28pEnHrdWGqRD77gn/wing.png',
      category: 'wing',
    },
    {
      name: 'Wing',
      price: '0.3',
      currency: 'ETH',
      description: 'No description',
      level: 2,
      image: 'https://gateway.pinata.cloud/ipfs/QmX6U3cGjwzgYpwvzLvy5brfiR3it28pEnHrdWGqRD77gn/wing.png',
      category: 'wing',
    },
    {
      name: 'Wing',
      price: '0.5',
      currency: 'ETH',
      description: 'No description',
      level: 3,
      image: 'https://gateway.pinata.cloud/ipfs/QmX6U3cGjwzgYpwvzLvy5brfiR3it28pEnHrdWGqRD77gn/wing.png',
      category: 'wing',
    },
    {
      name: 'Wing',
      price: '0.6',
      currency: 'ETH',
      description: 'No description',
      level: 4,
      image: 'https://gateway.pinata.cloud/ipfs/QmX6U3cGjwzgYpwvzLvy5brfiR3it28pEnHrdWGqRD77gn/wing.png',
      category: 'wing',
    },
    {
      name: 'Wing',
      price: '0.9',
      currency: 'ETH',
      description: 'No description',
      level: 5,
      image: 'https://gateway.pinata.cloud/ipfs/QmX6U3cGjwzgYpwvzLvy5brfiR3it28pEnHrdWGqRD77gn/wing.png',
      category: 'wing',
    },
  ];
  var sceptreData = [
    {
      name: 'Sceptre',
      price: '0.2',
      currency: 'ETH',
      description: 'No description',
      level: 1,
      image: 'https://gateway.pinata.cloud/ipfs/QmX6U3cGjwzgYpwvzLvy5brfiR3it28pEnHrdWGqRD77gn/sceptre.png',
      category: 'sceptre',
    },
    {
      name: 'Sceptre',
      price: '0.3',
      currency: 'ETH',
      description: 'No description',
      level: 2,
      image: 'https://gateway.pinata.cloud/ipfs/QmX6U3cGjwzgYpwvzLvy5brfiR3it28pEnHrdWGqRD77gn/sceptre.png',
      category: 'sceptre',
    },
    {
      name: 'Sceptre',
      price: '0.5',
      currency: 'ETH',
      description: 'No description',
      level: 3,
      image: 'https://gateway.pinata.cloud/ipfs/QmX6U3cGjwzgYpwvzLvy5brfiR3it28pEnHrdWGqRD77gn/sceptre.png',
      category: 'sceptre',
    },
    {
      name: 'Sceptre',
      price: '0.6',
      currency: 'ETH',
      description: 'No description',
      level: 4,
      image: 'https://gateway.pinata.cloud/ipfs/QmX6U3cGjwzgYpwvzLvy5brfiR3it28pEnHrdWGqRD77gn/sceptre.png',
      category: 'sceptre',
    },
    {
      name: 'Sceptre',
      price: '0.9',
      currency: 'ETH',
      description: 'No description',
      level: 5,
      image: 'https://gateway.pinata.cloud/ipfs/QmX6U3cGjwzgYpwvzLvy5brfiR3it28pEnHrdWGqRD77gn/sceptre.png',
      category: 'sceptre',
    },
  ];
  try {
    const data = await ItemDao.createItem([
      ...gunData,
      ...swordData,
      ...bowData,
      ...armorData,
      ...helmetData,
      ...wingData,
      ...sceptreData,
    ]);
    return res.status(200).send(data);
  } catch (error) {
    return res.status(400).send('error');
  }
});

// DELETE items based on category
router.delete('/item', async (req, res, next) => {
  try {
    const data = await ItemDao.deleteItem();
    return res.status(200).send(data);
  } catch (error) {
    return res.status(400).send('error');
  }
});
module.exports = router;
