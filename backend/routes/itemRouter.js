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
      image: 'QmYPaKCKa6N6Y1f7NfHcX2cSpJRSatf41brUPffa84YNQm',
      category: 'armor',
    },
    {
      name: 'Armor',
      price: '1.6',
      currency: 'ETH',
      description: 'No description',
      level: 2,
      image: 'QmYPaKCKa6N6Y1f7NfHcX2cSpJRSatf41brUPffa84YNQm',
      category: 'armor',
    },
    {
      name: 'Armor',
      price: '1.8',
      currency: 'ETH',
      description: 'No description',
      level: 3,
      image: 'QmYPaKCKa6N6Y1f7NfHcX2cSpJRSatf41brUPffa84YNQm',
      category: 'armor',
    },
    {
      name: 'Armor',
      price: '2.0',
      currency: 'ETH',
      description: 'No description',
      level: 4,
      image: 'QmYPaKCKa6N6Y1f7NfHcX2cSpJRSatf41brUPffa84YNQm',
      category: 'armor',
    },
    {
      name: 'Armor',
      price: '2.9',
      currency: 'ETH',
      description: 'No description',
      level: 5,
      image: 'QmYPaKCKa6N6Y1f7NfHcX2cSpJRSatf41brUPffa84YNQm',
      category: 'armor',
    },
  ];
  var helmetData = [
    {
      name: 'Helmet',
      price: '0.2',
      currency: 'ETH',
      description: 'No description',
      level: 1,
      image: 'Qmath2HgLVjGy3CmmzmLshoDThqFrQNj4ueRrd8YEAQgDA',
      category: 'helmet',
    },
    {
      name: 'Helmet',
      price: '0.3',
      currency: 'ETH',
      description: 'No description',
      level: 2,
      image: 'Qmath2HgLVjGy3CmmzmLshoDThqFrQNj4ueRrd8YEAQgDA',
      category: 'helmet',
    },
    {
      name: 'Helmet',
      price: '0.5',
      currency: 'ETH',
      description: 'No description',
      level: 3,
      image: 'Qmath2HgLVjGy3CmmzmLshoDThqFrQNj4ueRrd8YEAQgDA',
      category: 'helmet',
    },
    {
      name: 'Helmet',
      price: '0.6',
      currency: 'ETH',
      description: 'No description',
      level: 4,
      image: 'Qmath2HgLVjGy3CmmzmLshoDThqFrQNj4ueRrd8YEAQgDA',
      category: 'helmet',
    },
    {
      name: 'Helmet',
      price: '0.9',
      currency: 'ETH',
      description: 'No description',
      level: 5,
      image: 'Qmath2HgLVjGy3CmmzmLshoDThqFrQNj4ueRrd8YEAQgDA',
      category: 'helmet',
    },
  ];
  var swordData = [
    {
      name: 'Normal Sword',
      price: '0.3',
      currency: 'ETH',
      description: 'No description',
      level: 1,
      image: 'QmYqV2jhYyZJBmvx5kU6KycFkTTG2F2MGCGtiMJrS8g4dE',
      category: 'sword',
    },
    {
      name: 'Icy Sword',
      price: '0.4',
      currency: 'ETH',
      description: 'No description',
      level: 2,
      image: 'QmYqV2jhYyZJBmvx5kU6KycFkTTG2F2MGCGtiMJrS8g4dE',
      category: 'sword',
    },
    {
      name: 'Lightening Sword',
      price: '0.5',
      currency: 'ETH',
      description: 'No description',
      level: 3,
      image: 'QmYqV2jhYyZJBmvx5kU6KycFkTTG2F2MGCGtiMJrS8g4dE',
      category: 'sword',
    },
    {
      name: 'Sharp Sword',
      price: '0.7',
      currency: 'ETH',
      description: 'No description',
      level: 4,
      image: 'QmYqV2jhYyZJBmvx5kU6KycFkTTG2F2MGCGtiMJrS8g4dE',
      category: 'sword',
    },
    {
      name: 'Fire Sword',
      price: '1.0',
      currency: 'ETH',
      description: 'No description',
      level: 5,
      image: 'QmYqV2jhYyZJBmvx5kU6KycFkTTG2F2MGCGtiMJrS8g4dE',
      category: 'sword',
    },
  ];
  var knifeData = [
    {
      name: 'Knife',
      price: '0.2',
      currency: 'ETH',
      description: 'No description',
      level: 1,
      image: 'QmYBRqwjCu95NpTbkwRmseUEKd1wNS4ZvyuQZWPDZaZjNs',
      category: 'knife',
    },
    {
      name: 'Knife',
      price: '0.3',
      currency: 'ETH',
      description: 'No description',
      level: 2,
      image: 'QmYBRqwjCu95NpTbkwRmseUEKd1wNS4ZvyuQZWPDZaZjNs',
      category: 'knife',
    },
    {
      name: 'Knife',
      price: '0.5',
      currency: 'ETH',
      description: 'No description',
      level: 3,
      image: 'QmYBRqwjCu95NpTbkwRmseUEKd1wNS4ZvyuQZWPDZaZjNs',
      category: 'knife',
    },
    {
      name: 'Knife',
      price: '0.6',
      currency: 'ETH',
      description: 'No description',
      level: 4,
      image: 'QmYBRqwjCu95NpTbkwRmseUEKd1wNS4ZvyuQZWPDZaZjNs',
      category: 'knife',
    },
    {
      name: 'Knife',
      price: '0.9',
      currency: 'ETH',
      description: 'No description',
      level: 5,
      image: 'QmYBRqwjCu95NpTbkwRmseUEKd1wNS4ZvyuQZWPDZaZjNs',
      category: 'knife',
    },
  ];
  var tessenData = [
    {
      name: 'Tessen',
      price: '0.2',
      currency: 'ETH',
      description: 'No description',
      level: 1,
      image: 'QmTyG1N1d5XaS28EvuH4nvaFC6S38NgYt87BeySvsoS98n',
      category: 'tessen',
    },
    {
      name: 'Tessen',
      price: '0.3',
      currency: 'ETH',
      description: 'No description',
      level: 2,
      image: 'QmTyG1N1d5XaS28EvuH4nvaFC6S38NgYt87BeySvsoS98n',
      category: 'tessen',
    },
    {
      name: 'Tessen',
      price: '0.5',
      currency: 'ETH',
      description: 'No description',
      level: 3,
      image: 'QmTyG1N1d5XaS28EvuH4nvaFC6S38NgYt87BeySvsoS98n',
      category: 'tessen',
    },
    {
      name: 'Tessen',
      price: '0.6',
      currency: 'ETH',
      description: 'No description',
      level: 4,
      image: 'QmTyG1N1d5XaS28EvuH4nvaFC6S38NgYt87BeySvsoS98n',
      category: 'tessen',
    },
    {
      name: 'Tessen',
      price: '0.9',
      currency: 'ETH',
      description: 'No description',
      level: 5,
      image: 'QmTyG1N1d5XaS28EvuH4nvaFC6S38NgYt87BeySvsoS98n',
      category: 'tessen',
    },
  ];
  var bowData = [
    {
      name: 'Bow',
      price: '0.2',
      currency: 'ETH',
      description: 'No description',
      level: 1,
      image: 'QmbVbMQiDjhvtLGFNnJ3VoXACHbPJusQBzMQ43mpYvxFsd',
      category: 'bow and arrow',
    },
    {
      name: 'Bow',
      price: '0.3',
      currency: 'ETH',
      description: 'No description',
      level: 2,
      image: 'QmbVbMQiDjhvtLGFNnJ3VoXACHbPJusQBzMQ43mpYvxFsd',
      category: 'bow and arrow',
    },
    {
      name: 'Bow',
      price: '0.5',
      currency: 'ETH',
      description: 'No description',
      level: 3,
      image: 'QmbVbMQiDjhvtLGFNnJ3VoXACHbPJusQBzMQ43mpYvxFsd',
      category: 'bow and arrow',
    },
    {
      name: 'Bow',
      price: '0.6',
      currency: 'ETH',
      description: 'No description',
      level: 4,
      image: 'QmbVbMQiDjhvtLGFNnJ3VoXACHbPJusQBzMQ43mpYvxFsd',
      category: 'bow and arrow',
    },
    {
      name: 'Bow',
      price: '0.9',
      currency: 'ETH',
      description: 'No description',
      level: 5,
      image: 'QmbVbMQiDjhvtLGFNnJ3VoXACHbPJusQBzMQ43mpYvxFsd',
      category: 'bow and arrow',
    },
  ];
  var gunData = [
    {
      name: 'Normal Gun',
      price: '1.3',
      currency: 'ETH',
      description: 'No description',
      level: 1,
      image: 'QmfZSKVadAmSonNyvDvkLNTb2nL35GJ82CRqDUFhGQ8CgQ',
      category: 'gun',
    },
    {
      name: 'Speed Gun',
      price: '1.6',
      currency: 'ETH',
      description: 'No description',
      level: 2,
      image: 'QmfZSKVadAmSonNyvDvkLNTb2nL35GJ82CRqDUFhGQ8CgQ',
      category: 'gun',
    },
    {
      name: 'Light Gun',
      price: '1.8',
      currency: 'ETH',
      description: 'No description',
      level: 3,
      image: 'QmfZSKVadAmSonNyvDvkLNTb2nL35GJ82CRqDUFhGQ8CgQ',
      category: 'gun',
    },
    {
      name: 'Fast Gun',
      price: '2.0',
      currency: 'ETH',
      description: 'No description',
      level: 4,
      image: 'QmfZSKVadAmSonNyvDvkLNTb2nL35GJ82CRqDUFhGQ8CgQ',
      category: 'gun',
    },
    {
      name: 'Fire Gun',
      price: '2.9',
      currency: 'ETH',
      description: 'No description',
      level: 5,
      image: 'QmfZSKVadAmSonNyvDvkLNTb2nL35GJ82CRqDUFhGQ8CgQ',
      category: 'gun',
    },
  ];
  var wingData = [
    {
      name: 'Wing',
      price: '0.2',
      currency: 'ETH',
      description: 'No description',
      level: 1,
      image: 'QmbqwfPekXBqC3CCwt5nAiAcEV5ku6ASk7wnRuQfV8kWua',
      category: 'wing',
    },
    {
      name: 'Wing',
      price: '0.3',
      currency: 'ETH',
      description: 'No description',
      level: 2,
      image: 'QmbqwfPekXBqC3CCwt5nAiAcEV5ku6ASk7wnRuQfV8kWua',
      category: 'wing',
    },
    {
      name: 'Wing',
      price: '0.5',
      currency: 'ETH',
      description: 'No description',
      level: 3,
      image: 'QmbqwfPekXBqC3CCwt5nAiAcEV5ku6ASk7wnRuQfV8kWua',
      category: 'wing',
    },
    {
      name: 'Wing',
      price: '0.6',
      currency: 'ETH',
      description: 'No description',
      level: 4,
      image: 'QmbqwfPekXBqC3CCwt5nAiAcEV5ku6ASk7wnRuQfV8kWua',
      category: 'wing',
    },
    {
      name: 'Wing',
      price: '0.9',
      currency: 'ETH',
      description: 'No description',
      level: 5,
      image: 'QmbqwfPekXBqC3CCwt5nAiAcEV5ku6ASk7wnRuQfV8kWua',
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
      image: 'QmQfKtYBdDB8fDxUo6c53RbZUd7oe3agHjEWqt9kA3P2PD',
      category: 'sceptre',
    },
    {
      name: 'Sceptre',
      price: '0.3',
      currency: 'ETH',
      description: 'No description',
      level: 2,
      image: 'QmQfKtYBdDB8fDxUo6c53RbZUd7oe3agHjEWqt9kA3P2PD',
      category: 'sceptre',
    },
    {
      name: 'Sceptre',
      price: '0.5',
      currency: 'ETH',
      description: 'No description',
      level: 3,
      image: 'QmQfKtYBdDB8fDxUo6c53RbZUd7oe3agHjEWqt9kA3P2PD',
      category: 'sceptre',
    },
    {
      name: 'Sceptre',
      price: '0.6',
      currency: 'ETH',
      description: 'No description',
      level: 4,
      image: 'QmQfKtYBdDB8fDxUo6c53RbZUd7oe3agHjEWqt9kA3P2PD',
      category: 'sceptre',
    },
    {
      name: 'Sceptre',
      price: '0.9',
      currency: 'ETH',
      description: 'No description',
      level: 5,
      image: 'QmQfKtYBdDB8fDxUo6c53RbZUd7oe3agHjEWqt9kA3P2PD',
      category: 'sceptre',
    },
  ];
  var magicvaseData = [
    {
      name: 'Magic Vase',
      price: '0.2',
      currency: 'ETH',
      description: 'No description',
      level: 1,
      image: 'QmNTNGAQjMbTPukVi7LCwa4fvGzzUzkaUFYHqsLGk2KWGA',
      category: 'magic vase',
    },
    {
      name: 'Magic Vase',
      price: '0.3',
      currency: 'ETH',
      description: 'No description',
      level: 2,
      image: 'QmNTNGAQjMbTPukVi7LCwa4fvGzzUzkaUFYHqsLGk2KWGA',
      category: 'magic vase',
    },
    {
      name: 'Magic Vase',
      price: '0.5',
      currency: 'ETH',
      description: 'No description',
      level: 3,
      image: 'QmNTNGAQjMbTPukVi7LCwa4fvGzzUzkaUFYHqsLGk2KWGA',
      category: 'magic vase',
    },
    {
      name: 'Magic Vase',
      price: '0.6',
      currency: 'ETH',
      description: 'No description',
      level: 4,
      image: 'QmNTNGAQjMbTPukVi7LCwa4fvGzzUzkaUFYHqsLGk2KWGA',
      category: 'magic vase',
    },
    {
      name: 'Magic Vase',
      price: '0.9',
      currency: 'ETH',
      description: 'No description',
      level: 5,
      image: 'QmNTNGAQjMbTPukVi7LCwa4fvGzzUzkaUFYHqsLGk2KWGA',
      category: 'magic vase',
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
      ...knifeData,
      ...tessenData,
      ...magicvaseData,
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
