var express = require('express');
var router = express.Router();
var axios = require('axios');
var multer = require('multer');
var FormData = require('form-data');
var fs = require('fs');

var CharacterDao = require('../dao/character');

// Public
// GET Single character based on ID
router.get('/character/:id', async (req, res, next) => {
  const characterid = req.params.id;
  try {
    const data = await CharacterDao.getCharacterById(characterid);
    return res.status(200).send(data);
  } catch (error) {
    return res.status(400).send('error');
  }
});

// Public
// GET All character
router.get('/characters', async (req, res, next) => {
  try {
    const data = await CharacterDao.getCharacters();
    return res.status(200).send(data);
  } catch (error) {
    return res.status(400).send('error');
  }
});

// POST create new character based on details
router.post('/character', async (req, res, next) => {
  // var characterData = {
  //   id: req.body.id,
  //   name: req.body.name,
  //   description: req.body.description ? req.body.description : '',
  //   level: req.body.level ? req.body.level : '',
  //   image: req.body.image ? req.body.image : '',
  // };
  var characterData = [
    {
      id: 1,
      name: 'Fleet',
      description: 'No description',
      level: 0,
      image: 'fleet.png',
    },
    {
      id: 2,
      name: 'Giao',
      description: 'No description',
      level: 0,
      image: 'giao.png',
    },
    {
      id: 3,
      name: 'Reen',
      description: 'No description',
      level: 0,
      image: 'reen.png',
    },
    {
      id: 4,
      name: 'Shyan',
      description: 'No description',
      level: 0,
      image: 'shyan.png',
    },
  ];
  try {
    const data = await CharacterDao.createCharacter(characterData);
    return res.status(200).send(data);
  } catch (error) {
    return res.status(400).send('error');
  }
});

module.exports = router;
