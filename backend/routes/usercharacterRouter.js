var express = require("express");
var router = express.Router();
var UserCharacterDao = require("../dao/usercharacter");

// Public
// GET Single Character based on ID
router.get("/usercharacter/:id", async (req, res, next) => {
  const chracterid = req.params.id;
  try {
    const data = await UserCharacterDao.getCharacterById(chracterid);
    return res.status(200).send(data);
  } catch (error) {
    return res.status(400).send("error");
  }
});

// Public
// GET Single Character based on ID
router.get("/usercharacter-top", async (req, res, next) => {
  try {
    const data = await UserCharacterDao.getTopCharacters();
    return res.status(200).send(data);
  } catch (error) {
    return res.status(400).send(error);
  }
});

// Public
// GET All Characters
router.get("/usercharacters", async (req, res, next) => {
  try {
    const data = await UserCharacterDao.getAllCharacters();
    return res.status(200).send(data);
  } catch (error) {
    return res.status(400).send("error");
  }
});

// Public
// GET All Characters based on user address
router.get("/usercharacters/:owner", async (req, res, next) => {
  let userAddress = req.params.owner;
  try {
    const data = await UserCharacterDao.getUserCharacters(userAddress);
    return res.status(200).send(data);
  } catch (error) {
    return res.status(400).send("error");
  }
});

// Public
// POST Add new character into user's list
router.post("/usercharacter", async (req, res, next) => {
  try {
    const data = await UserCharacterDao.createCharacter(req.body);
    return res.status(200).send(data);
  } catch (error) {
    return res.status(400).send(error);
  }
});

// DELETE items based on category
router.delete("/usercharacter/:owner", async (req, res, next) => {
  try {
    let owner = req.params.owner;

    const data = await UserCharacterDao.deleteItem(owner);
    return res.status(200).send(data);
  } catch (error) {
    return res.status(400).send("error");
  }
});
module.exports = router;
