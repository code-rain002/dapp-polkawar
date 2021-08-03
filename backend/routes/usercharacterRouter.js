var express = require("express");
var router = express.Router();
var UserCharacterDao = require("../dao/useritem");

// Public
// GET Single Character based on ID
router.get("/characteritem/:id", async (req, res, next) => {
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
router.get("/characteritems", async (req, res, next) => {
  try {
    const data = await UserCharacterDao.getAllCharacters();
    return res.status(200).send(data);
  } catch (error) {
    return res.status(400).send("error");
  }
});

// Public
// GET All Characters based on user address
router.get("/characteritems/:owner", async (req, res, next) => {
  let userAddress = req.params.owner;
  console.log(userAddress);
  try {
    const data = await UserCharacterDao.getUserCharacters(userAddress);
    return res.status(200).send(data);
  } catch (error) {
    return res.status(400).send("error");
  }
});

// Public
// POST Add new character into user's list
router.post("/characteritem", async (req, res, next) => {
  var newCharacter = {
    tokenId: req.body.token_id,
    owner: req.body.owner,
    buyDate: req.body.buydate,
  };
  console.log(req.body);
  console.log(newCharacter);
  try {
    const data = await UserCharacterDao.createCharacter(
      newCharacter,
      req.body.owner
    );
    return res.status(200).send(data);
  } catch (error) {
    return res.status(400).send("error");
  }
});

// DELETE items based on category
router.delete("/characteritem", async (req, res, next) => {
  try {
    const data = await UserCharacterDao.deleteItem();
    return res.status(200).send(data);
  } catch (error) {
    return res.status(400).send("error");
  }
});
module.exports = router;
