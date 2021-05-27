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
      name: 'Magician',
      properties: {
        hp: 27,
        mp: 22,
        pAtk: 2,
        mAtk: 10,
        pDef: 4,
        mDef: 6,
        spd: 0.3,
      },

      description:
        'The magician is the character who has mysterious magic, supernatural tricks and inherits the power of the evil darkness',
      level: 0,
      image: 'QmZBND1fxvHfCEnA5fRTdFiR8ucufFv7oQCR2sPKon8rXT',
    },
    {
      id: 2,
      name: 'Magician',
      description:
        'The magician is the character who has mysterious magic, supernatural tricks and inherits the power of the evil darkness',
      level: 1,
      image: 'QmUshnhGZHJbSdKonBe2VYewcGzSPZ7RphG4GU4wAX2x77',
    },
    {
      id: 3,
      name: 'Magician',
      description:
        'The magician is the character who has mysterious magic, supernatural tricks and inherits the power of the evil darkness',
      level: 2,
      image: 'QmYcRZbhRYXtbJuYuGFK5gCcSyoQtFkajvBJwv61pcEDfT',
    },
    {
      id: 4,
      name: 'Archer',
      properties: {
        hp: 29,
        mp: 25,
        pAtk: 9,
        mAtk: 2,
        pDef: 4,
        mDef: 4,
        spd: 1,
      },
      description: 'The archer is the character with fast attack speed and angelic beauty.',
      level: 0,
      image: 'QmchE9x6ggMAZPyZZ49Q2QKJ3bcAHNnSSHtooR7s3ZWmtE',
    },
    {
      id: 5,
      name: 'Archer',
      description: 'The archer is the character with fast attack speed and angelic beauty.',
      level: 1,
      image: 'QmchzUzRYoqpe5XrNhsFSaEVrQrJwr5PniPvyWvnx7SaJz',
    },
    {
      id: 6,
      name: 'Archer',
      description: 'The archer is the character with fast attack speed and angelic beauty.',
      level: 2,
      image: 'Qmac8LX5WASVJZAmMpuNSEtpW5985yuoGxNR8nkJk5AYxR',
    },
    {
      id: 7,
      name: 'Warrior',
      properties: {
        hp: 30,
        mp: 21,
        pAtk: 6,
        mAtk: 0,
        pDef: 7,
        mDef: 7,
        spd: 0.7,
      },
      description: 'The Warrior is a character with high strength and the most powerful one in PolkaWar.',
      level: 0,
      image: 'QmYn3SNyCXenSbwE4QYSVUK1RTJudxY2VfucUfwodwKQRz',
    },
    {
      id: 8,
      name: 'Warrior',
      description: 'The Warrior is a character with high strength and the most powerful one in PolkaWar.',
      level: 1,
      image: 'QmSh7mFxLGG2rC582MwKNTobWs6YSJ4KEr2uWHWNU8fq9k',
    },
    {
      id: 9,
      name: 'Warrior',
      description: 'The Warrior is a character with high strength and the most powerful one in PolkaWar.',
      level: 2,
      image: 'QmR3yXkCF6NRu5WcmmDgokKJRtwzi819HVJ5g4eRAJmY66',
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
