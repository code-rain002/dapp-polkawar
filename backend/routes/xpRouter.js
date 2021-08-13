var express = require("express");
var router = express.Router();

var XpDao = require("../dao/xp");

// GET all xp just for testing purpose
router.get("/xp", async (req, res, next) => {
  try {
    const data = await XpDao.getAllXp();
    return res.status(200).send(data);
  } catch (error) {
    return res.status(400).send(error);
  }
});

// POST create or update new users xp
router.post("/xp", async (req, res, next) => {
  let ownerAddress = req.body.owner;
  try {
    const data = await XpDao.updateXp(ownerAddress);
    return res.status(200).send(data);
  } catch (error) {
    return res.status(400).send("error");
  }
});

// DELETE create new user based on details
router.delete("/xp", async (req, res, next) => {
  try {
    const data = await XpDao.deleteXp();
    return res.status(200).send(data);
  } catch (error) {
    return res.status(400).send("error");
  }
});
module.exports = router;
