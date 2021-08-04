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
  let tokenId = req.body.token_id;
  let characterId = req.body.character_id;
  let owner = req.body.owner;
  let username = req.body.username;

  try {
    const data = await UserCharacterDao.createCharacter(
      tokenId,
      characterId,
      owner,
      username
    );
    return res.status(200).send(data);
  } catch (error) {
    return res.status(400).send(error);
  }
});

// DELETE items based on category
router.delete("/usercharacter", async (req, res, next) => {
  try {
    const data = await UserCharacterDao.deleteItem();
    return res.status(200).send(data);
  } catch (error) {
    return res.status(400).send("error");
  }
});
module.exports = router;
