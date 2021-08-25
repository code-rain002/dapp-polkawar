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

// GET all xp by owner
router.get("/xp/:owner", async (req, res, next) => {
  try {
    const data = await XpDao.getXpById(req.params.owner);
    return res.status(200).send(data);
  } catch (error) {
    return res.status(400).send(error);
  }
});

// POST create or update new users xp
router.post("/xp", async (req, res, next) => {
  let ownerAddress = req.body.owner;
  let blockNo = req.body.blockNo;

  try {
    const data = await XpDao.updateXp(ownerAddress, blockNo);
    return res.status(200).send(data);
  } catch (error) {
    return res.status(400).send(error);
  }
});

router.delete("/xp", async (req, res, next) => {
  try {
    const data = await XpDao.deleteXp();
    return res.status(200).send(data);
  } catch (error) {
    return res.status(400).send("error");
  }
});
module.exports = router;
