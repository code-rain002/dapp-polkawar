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
  var characterData = [
    {
      id: 1,
      name: 'Fleet',
      description: 'No description',
      level: 0,
      image: 'https://gateway.pinata.cloud/ipfs/QmfJeitxvEFaTesS1yQfJkHAFeRDEgADVsey7xXGXuHxYm',
    },
    {
      id: 2,
      name: 'Giao',
      description: 'No description',
      level: 0,
      image: 'https://gateway.pinata.cloud/ipfs/QmT5qs21obBytdAm9YzQwbipLWN93SBJ59rAVm7GCcTETs',
    },
    {
      id: 3,
      name: 'Reen',
      description: 'No description',
      level: 0,
      image: 'https://gateway.pinata.cloud/ipfs/QmSSoTC9y3M96jq2g9KtjfyqqoAFxCqUFf9mtef5o9TrfL',
    },
    {
      id: 4,
      name: 'Shyan',
      description: 'No description',
      level: 0,
      image: 'https://gateway.pinata.cloud/ipfs/QmUPYSHcRuqXrZhNXNfmrubu1EjkMbccfGVFZ7PDxJmpFy/characters/shyan.png',
    },
  ];
  try {
    const data = await CharacterDao.createCharacter(characterData);
    return res.status(200).send(data);
  } catch (error) {
    return res.status(400).send('error');
  }
});

// POST create new character based on details
router.delete('/character', async (req, res, next) => {
  try {
    const data = await CharacterDao.deleteCharacter();
    return res.status(200).send(data);
  } catch (error) {
    return res.status(400).send('error');
  }
});

module.exports = router;
