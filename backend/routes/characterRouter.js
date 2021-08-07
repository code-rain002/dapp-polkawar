var express = require("express");
var router = express.Router();
var axios = require("axios");
var multer = require("multer");
var FormData = require("form-data");
var fs = require("fs");

var CharacterDao = require("../dao/character");

// Public
// GET Single character based on ID
router.get("/character/:id", async (req, res, next) => {
  const characterid = req.params.id;
  try {
    const data = await CharacterDao.getCharacterById(characterid);
    return res.status(200).send(data);
  } catch (error) {
    return res.status(400).send("error");
  }
});

// Public
// GET All character
router.get("/characters", async (req, res, next) => {
  try {
    const data = await CharacterDao.getCharacters();
    return res.status(200).send(data);
  } catch (error) {
    return res.status(400).send("error");
  }
});

// POST create new character based on details
router.post("/character", async (req, res, next) => {
  var characterData = [
    {
      id: 1,
      name: "Warrior",
      level: 0,
      properties: {
        xp: 0,
        hp: 30,
        mp: 23,
        Patk: 6,
        Pdef: 7,
        speed: 0.7,
        accuracy: 3,
      },
      nextxp: 50,
      description:
        "The Warrior is a character with high strength and the most powerful one in PolkaWar.",
      hashImage: "QmYn3SNyCXenSbwE4QYSVUK1RTJudxY2VfucUfwodwKQRz",
    },
    {
      id: 2,
      name: "Warrior",
      level: 1,
      properties: {
        xp: 50,
        hp: 40,
        mp: 30,
        Patk: 7,
        Pdef: 8,
        speed: 0.75,
        accuracy: 4,
      },
      nextxp: 200,
      description:
        "The Warrior is a character with high strength and the most powerful one in PolkaWar.",
      hashImage: "QmSh7mFxLGG2rC582MwKNTobWs6YSJ4KEr2uWHWNU8fq9k",
    },
    {
      id: 3,
      name: "Warrior",
      properties: {
        xp: 200,
        hp: 60,
        mp: 44,
        Patk: 9,
        Pdef: 10,
        speed: 0.85,
        accuracy: 6,
      },
      nextxp: 300,
      level: 2,
      description:
        "The Warrior is a character with high strength and the most powerful one in PolkaWar.",
      hashImage: "QmR3yXkCF6NRu5WcmmDgokKJRtwzi819HVJ5g4eRAJmY66",
    },
    {
      id: 4,
      name: "Magician",
      level: 0,
      properties: {
        xp: 0,
        hp: 27,
        mp: 29,
        Patk: 4,
        Pdef: 9,
        speed: 0.5,
        accuracy: 3,
      },
      nextxp: 50,
      description:
        "The magician is the character who has mysterious magic, supernatural tricks and inherits the power of the evil darkness",
      hashImage: "QmZBND1fxvHfCEnA5fRTdFiR8ucufFv7oQCR2sPKon8rXT",
    },
    {
      id: 5,
      name: "Magician",
      level: 1,
      properties: {
        xp: 50,
        hp: 37,
        mp: 36,
        Patk: 5,
        Pdef: 10,
        speed: 0.55,
        accuracy: 4,
      },
      nextxp: 200,
      description:
        "The magician is the character who has mysterious magic, supernatural tricks and inherits the power of the evil darkness",
      hashImage: "QmUshnhGZHJbSdKonBe2VYewcGzSPZ7RphG4GU4wAX2x77",
    },
    {
      id: 6,
      name: "Magician",
      level: 2,
      properties: {
        xp: 200,
        hp: 57,
        mp: 50,
        Patk: 7,
        Pdef: 12,
        speed: 0.65,
        accuracy: 6,
      },
      nextxp: 500,
      description:
        "The magician is the character who has mysterious magic, supernatural tricks and inherits the power of the evil darkness",
      hashImage: "QmYcRZbhRYXtbJuYuGFK5gCcSyoQtFkajvBJwv61pcEDfT",
    },
    {
      id: 7,
      name: "Archer",
      level: 0,
      properties: {
        xp: 0,
        hp: 25,
        mp: 25,
        Patk: 9,
        Pdef: 5,
        speed: 1,
        accuracy: 2,
      },
      nextxp: 50,
      description:
        "The archer is the character with fast attack speed and angelic beauty.",
      hashImage: "QmchE9x6ggMAZPyZZ49Q2QKJ3bcAHNnSSHtooR7s3ZWmtE",
    },
    {
      id: 8,
      name: "Archer",
      level: 1,
      properties: {
        xp: 50,
        hp: 35,
        mp: 32,
        Patk: 10,
        Pdef: 6,
        speed: 1.05,
        accuracy: 3,
      },
      nextxp: 200,
      description:
        "The archer is the character with fast attack speed and angelic beauty.",
      hashImage: "QmchzUzRYoqpe5XrNhsFSaEVrQrJwr5PniPvyWvnx7SaJz",
    },
    {
      id: 9,
      name: "Archer",
      level: 2,
      properties: {
        xp: 200,
        hp: 55,
        mp: 46,
        Patk: 12,
        Pdef: 8,
        speed: 1.15,
        accuracy: 5,
      },
      nextxp: 500,
      description:
        "The archer is the character with fast attack speed and angelic beauty.",
      hashImage: "Qmac8LX5WASVJZAmMpuNSEtpW5985yuoGxNR8nkJk5AYxR",
    },
  ];
  try {
    const data = await CharacterDao.createCharacters(characterData);
    return res.status(200).send(data);
  } catch (error) {
    return res.status(400).send(error);
  }
});

// POST create new character based on details
router.delete("/character", async (req, res, next) => {
  try {
    const data = await CharacterDao.deleteCharacter();
    return res.status(200).send(data);
  } catch (error) {
    return res.status(400).send("error");
  }
});

module.exports = router;
