var express = require("express");
var router = express.Router();
var axios = require("axios");
var multer = require("multer");
var FormData = require("form-data");
var fs = require("fs");
const characterHelper = require("../helper/characterHelper");

// POST create new character based on details
router.post("/claim-award", async (req, res, next) => {
  try {
    let winnerAddress = req.body.address;
    let poolId = req.body.poolId;
    const data = await characterHelper.claimAward(winnerAddress, poolId);

    return res.status(200).send(data);
  } catch (error) {
    return res.status(400).send(error);
  }
});

module.exports = router;
