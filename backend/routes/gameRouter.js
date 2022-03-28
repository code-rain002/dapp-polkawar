var express = require("express");
var router = express.Router();
const characterHelper = require("../helper/characterHelper");
var bodyParser = require("body-parser");

var jsonParser = bodyParser.json();
// POST create new character based on details
router.post("/update-status", jsonParser, async (req, res, next) => {
  try {
    let poolId = req.body.pool_id;
    let winnerAddress = req.body.addresses;
    let drawStatus = req.body.draw_status;
    let data;

    let addressesArray = winnerAddress.split(",");

    console.log(Array.isArray(addressesArray));

    if (
      parseInt(poolId) >= 0 &&
      winnerAddress !== null &&
      drawStatus !== null
    ) {
      data = await characterHelper.updateStatus(
        poolId,
        addressesArray,
        drawStatus
      );
      if (data.stat === 400) {
        return res.status(400).send(data.message);
      } else {
        return res.status(200).send(data);
      }
    } else {
      return res.status(400).send("Either pool_id or address is wrong.");
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
