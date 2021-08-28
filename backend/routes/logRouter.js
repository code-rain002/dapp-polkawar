var express = require("express");
var router = express.Router();
const { Client } = require("@elastic/elasticsearch");
const constants = require("../utils/constants");
const client = new Client({
  node: "http://45.77.91.38:9200/",
});

let logIndex;
if (constants.net === 0) {
  logIndex = "polkawarlog";
} else {
  logIndex = "polkawarlogtest";
}
// GET all logs
router.get("/log", async (req, res, next) => {
  try {
    const result = await client.search({
      index: logIndex,
      body: {},
    });
    let data = result.body.hits;
    console.log(data);
    return res.status(200).send(data);
  } catch (error) {
    return res.status(400).send(error);
  }
});

// GET all logs by owner
router.get("/log/:owner", async (req, res, next) => {
  let owner = req.params.owner;
  try {
    const result = await client.search({
      index: logIndex,

      body: {
        query: {
          match: {
            owner: owner,
          },
        },
      },
    });
    let data = result.body.hits;
    console.log(data);
    return res.status(200).send(data);
  } catch (error) {
    return res.status(400).send(error);
  }
});

// POST New Log based on event
router.post("/log", async (req, res, next) => {
  let owner = req.body.owner;
  let time = req.body.time;
  let status = req.body.status;
  let transactionHash = req.body.transactionHash;
  let action = req.body.action;
  let info = req.body.info;
  try {
    const result = await client.index({
      index: logIndex,
      body: {
        owner: owner,
        time: time,
        status: status,
        transactionhash: transactionHash,
        action: action,
        info: info,
      },
    });
    return res.status(200).send(result.body.result);
  } catch (error) {
    return res.status(400).send(error);
  }
});
module.exports = router;
