var express = require("express");
var router = express.Router();
const characterHelper = require("../helper/characterHelper");

// POST create new character based on details
router.post("/update-status", async (req, res, next) => {
  try {
    let winnerAddress = req.body.address;
    let poolId = req.body.pool_id;
    let data;

    if (parseInt(poolId) > 0 && winnerAddress !== null) {
      data = await characterHelper.updateStatus(winnerAddress, poolId);

      return res.status(200).send(data);
    } else {
      return res.status(200).send("either pool_id or winner address is wrong.");
    }
  } catch (error) {
    return res.status(400).send(error);
  }
});
// GET status test
router.get("/status", async (req, res, next) => {
  try {
    return res.status(200).send("Working");
  } catch (error) {
    return res.status(400).send(error);
  }
});

module.exports = router;
